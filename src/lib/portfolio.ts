import { z } from "zod";

import { graphqlRequest } from "./graphql-client";
import { experienceSchema, profileSchema, projectSchema } from "./schemas";

const PROFILE_QUERY = /* GraphQL */ `
  query Profile {
    profile {
      id
      name
      headline
      bio
      avatarUrl
    }
  }
`;

const PROJECTS_QUERY = /* GraphQL */ `
  query Projects {
    projects {
      id
      slug
      title
      summary
      body
      coverUrl
      tags
      featured
      publishedAt
    }
  }
`;

export async function getProfile() {
  const data = await graphqlRequest(z.object({ profile: profileSchema }), PROFILE_QUERY);
  return data.profile;
}

export async function getProjects() {
  const data = await graphqlRequest(z.object({ projects: z.array(projectSchema) }), PROJECTS_QUERY);
  return data.projects;
}

const EXPERIENCES_QUERY = /* GraphQL */ `
  query Experiences {
    experiences {
      id
      company
      companyLogoUrl
      role
      startDate
      endDate
      description
      sortOrder
    }
  }
`;

export async function getExperiences() {
  const data = await graphqlRequest(
    z.object({ experiences: z.array(experienceSchema) }),
    EXPERIENCES_QUERY,
  );
  return data.experiences;
}

const SEND_CONTACT_MESSAGE_MUTATION = /* GraphQL */ `
  mutation SendContactMessage($input: SendContactMessageInput!) {
    sendContactMessage(input: $input)
  }
`;

export type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — always empty for a real visitor. */
  website?: string;
};

/** Runs client-side (the dialog submits directly from the browser to the API). */
export async function sendContactMessage(input: ContactMessageInput) {
  const data = await graphqlRequest(
    z.object({ sendContactMessage: z.boolean() }),
    SEND_CONTACT_MESSAGE_MUTATION,
    { input },
  );
  return data.sendContactMessage;
}
