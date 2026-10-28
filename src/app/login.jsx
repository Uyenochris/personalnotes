import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, hasFirebase } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState('');

  async function login() {
    try {
      if (signUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View style={{ padding: 15, flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, marginBottom: 15 }}>Personal Notes</Text>
      <Text>Email</Text>
      <TextInput style={{ borderWidth: 1, padding: 8, marginBottom: 10 }} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput style={{ borderWidth: 1, padding: 8, marginBottom: 10 }} value={password} onChangeText={setPassword} secureTextEntry />
      {!hasFirebase && <Text>Add Firebase settings in .env</Text>}
      <Text>{error}</Text>
      <Button title={signUp ? 'Sign Up' : 'Login'} onPress={login} disabled={!hasFirebase} />
      <Button title={signUp ? 'Back to Login' : 'Make Account'} onPress={() => setSignUp(!signUp)} />
    </View>
  );
}
