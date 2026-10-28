import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function Layout() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stop = onAuthStateChanged(auth, (person) => {
      setUser(person);
      setChecking(false);
    });
    return stop;
  }, []);

  if (checking) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <Stack>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" options={{ title: 'Login' }} />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="note" options={{ title: 'Note' }} />
      </Stack.Protected>
    </Stack>
  );
}
