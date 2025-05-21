import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}
