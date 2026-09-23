import { z } from "zod";
import { graphqlRequest } from "./graphql-client";
import { profileSchema, projectSchema } from "./schemas";

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
