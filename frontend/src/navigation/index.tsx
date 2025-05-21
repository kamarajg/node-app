import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountList from '../screens/AccountList';
import AddAccount from '../screens/AddAccount';
import AddDevice from '../screens/AddDevice';

export type RootStackParamList = {
  AccountList: undefined;
  AddAccount: undefined;
  AddDevice: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccountList">
        <Stack.Screen name="AccountList" component={AccountList} options={{ title: 'Accounts' }} />
        <Stack.Screen name="AddAccount" component={AddAccount} options={{ title: 'Add Account' }} />
        <Stack.Screen name="AddDevice" component={AddDevice} options={{ title: 'Add Device' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
