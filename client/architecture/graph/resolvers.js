export const defaults = {
  isAuthenticated: false,
};

export const resolvers = {
  Mutation: {
    setAuthState: (_, { authState }, { cache }) => {
      const data = {
        isAuthenticated: authState,
      };
      cache.writeData({ data });
      return authState;
    },
  },
};
