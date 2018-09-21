import gql from 'graphql-tag';
import apolloClientInstance from './apolloClientInstance';

const setAuthStateMutation = gql`
  mutation setAuthState($authState: Boolean) {
    setAuthState(authState: $authState) @client
  }
`;

const setAuthState = (value) =>
  apolloClientInstance.mutate({
    mutation: setAuthStateMutation,
    variables: { authState: value },
  });

export default setAuthState;
