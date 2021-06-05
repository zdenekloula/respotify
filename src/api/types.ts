export type PagingParameters = {
  limit?: number;
  offset?: number;
};

export type GraphQLQueryParameters = {
  token: string;
  hash: string;
  uri: string;
};

export type GraphQLQueryString = {
  operationName: string;
  variables: {
    uri: string;
  };
  extensions: {
    persistedQuery: {
      version: number;
      sha256Hash: string;
    };
  };
};
