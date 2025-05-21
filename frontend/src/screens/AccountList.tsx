import React, { useState } from 'react';
import { Text, View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { CREATE_ACCOUNT, CREATE_DEVICE } from '../graphql/mutations';

const GET_ACCOUNTS = gql`
  query {
    accounts {
      id
      name
      email
      devices {
        id
        name
      }
    }
  }
`;

type Device = {
  id: string;
  name: string;
};

type Account = {
  id: string;
  name: string;
  email: string;
  devices: Device[];
};

type QueryData = {
  accounts: Account[];
};

export default function AccountList() {
  const { loading, error, data, refetch } = useQuery<QueryData>(GET_ACCOUNTS);
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [createDevice] = useMutation(CREATE_DEVICE);

  const [accountName, setAccountName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');

  const [deviceName, setDeviceName] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const handleAddAccount = async () => {
    if (!accountName || !accountEmail) return;

    await createAccount({ variables: { name: accountName, email: accountEmail } });
    await refetch();

    setAccountName('');
    setAccountEmail('');
  };

  const handleAddDevice = async () => {
    if (!deviceName || !selectedAccountId) return;

    await createDevice({ variables: { name: deviceName, accountId: selectedAccountId } });
    await refetch();

    setDeviceName('');
    setSelectedAccountId('');
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Account</Text>
      <TextInput
        placeholder="Name"
        value={accountName}
        onChangeText={setAccountName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={accountEmail}
        onChangeText={setAccountEmail}
        style={styles.input}
      />
      <Button title="Create Account" onPress={handleAddAccount} />

      <Text style={styles.heading}>Add Device</Text>
      <TextInput
        placeholder="Device Name"
        value={deviceName}
        onChangeText={setDeviceName}
        style={styles.input}
      />
      <TextInput
        placeholder="Account ID"
        value={selectedAccountId}
        onChangeText={setSelectedAccountId}
        style={styles.input}
      />
      <Button title="Create Device" onPress={handleAddDevice} />

      <FlatList
        data={data?.accounts ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text style={styles.subheading}>Devices:</Text>
            {item.devices.map((device) => (
              <Text key={device.id}>• {device.name}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontWeight: 'bold', fontSize: 16, marginTop: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginVertical: 4
  },
  card: {
    padding: 16, borderBottomWidth: 1, borderColor: '#ccc', marginTop: 20
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  subheading: { marginTop: 8, fontWeight: '600' },
});
