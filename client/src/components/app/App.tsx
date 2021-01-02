import React from "react";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { AppContainer } from "../../containers/AppContainer";

const client: any = new ApolloClient({ uri: "/api" });

export function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
