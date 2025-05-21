import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_DEVICE } from '../graphql/mutations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDevice'>;

export default function AddDevice({ navigation }: Props) {
  const [name, setName] = useState('');
  const [accountId, setAccountId] = useState('');

  const [createDevice, { loading }] = useMutation(CREATE_DEVICE);

  const handleSubmit = async () => {
    if (!name || !accountId) {
      Alert.alert('Error', 'Both name and account ID are required.');
      return;
    }

    try {
      await createDevice({ variables: { name, accountId } });
      Alert.alert('Success', 'Device created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create device.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Device Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Account ID"
        value={accountId}
        onChangeText={setAccountId}
        style={styles.input}
      />
      <Button title={loading ? 'Creating...' : 'Create Device'} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
});
