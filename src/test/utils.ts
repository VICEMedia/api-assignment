import { graphql } from "graphql";

import { createSchema } from "../utils/createSchema";

interface Options {
  source: string;
  variableValues?: any;
}

export const callGraphql = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
    variableValues
  });
}