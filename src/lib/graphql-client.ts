import axios, { type AxiosError } from "axios";
import { z, type ZodType } from "zod";

import { loadPublicEnv } from "./env";
import { beginHttpRequest, endHttpRequest } from "./httpActivity";

declare module "axios" {
  interface AxiosRequestConfig {
    /**
     * Set to `false` to opt a request out of the global `HttpActivityOverlay`
     * (see `httpActivity.ts`) — for requests that already give their own
     * feedback, e.g. a form submission driven by `LoadingButton`. Defaults to
     * tracked (`true`) so any new request gets the overlay for free.
     */
    trackGlobalLoading?: boolean;
  }
}

const graphqlErrorSchema = z.object({ message: z.string() });
const graphqlResponseSchema = z.object({
  data: z.unknown().nullable().optional(),
  errors: z.array(graphqlErrorSchema).optional(),
});

export class GraphQLRequestError extends Error {
  constructor(messages: string[]) {
    super(messages.join("; "));
    this.name = "GraphQLRequestError";
  }
}

const client = axios.create({
  baseURL: loadPublicEnv().NEXT_PUBLIC_GRAPHQL_URL,
  headers: { "Content-Type": "application/json" },
});

// Drives the global `HttpActivityOverlay` (see `httpActivity.ts`) so a tracked
// request — the default — shows a full-screen loading state instead of leaving
// the page looking frozen. Harmless when this module runs on the server during
// page data fetching (a separate module instance in the Node process; nothing
// there reads that counter).
client.interceptors.request.use((config) => {
  if (config.trackGlobalLoading !== false) beginHttpRequest();
  return config;
});

client.interceptors.response.use(
  (response) => {
    if (response.config.trackGlobalLoading !== false) endHttpRequest();
    return response;
  },
  (error: AxiosError) => {
    if (error.config?.trackGlobalLoading !== false) endHttpRequest();
    return Promise.reject(error);
  },
);

/** Posts a GraphQL query/mutation and validates the payload against `schema`. */
export async function graphqlRequest<T>(
  schema: ZodType<T>,
  query: string,
  variables?: Record<string, unknown>,
  options?: { trackGlobalLoading?: boolean },
): Promise<T> {
  const response =
    options?.trackGlobalLoading === false
      ? await client.post("", { query, variables }, { trackGlobalLoading: false })
      : await client.post("", { query, variables });
  const body = graphqlResponseSchema.parse(response.data);

  if (body.errors?.length) {
    throw new GraphQLRequestError(body.errors.map((error) => error.message));
  }

  return schema.parse(body.data);
}
