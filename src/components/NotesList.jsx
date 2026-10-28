import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function NotesList({ favoritesOnly }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, 'notes'), where('userId', '==', uid));
    return onSnapshot(q, (snap) => {
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (e) => setError(e.message));
  }, [uid]);

  async function remove(id) {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function star(item) {
    try {
      await updateDoc(doc(db, 'notes', item.id), { favorite: !item.favorite });
    } catch (e) {
      setError(e.message);
    }
  }

  const items = favoritesOnly ? notes.filter((n) => n.favorite) : notes;

  if (favoritesOnly) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Favorite notes: {items.length}</Text>
        <Text>Go to Notes to look at them.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Number of notes: {notes.length}</Text>
      <Button title="New Note" onPress={() => router.push('/note')} />
      <Text>{error}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No notes</Text>}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text numberOfLines={2}>{item.content}</Text>
            <Button title={item.favorite ? 'Unfavorite' : 'Favorite'} onPress={() => star(item)} />
            <Button title="Edit" onPress={() => router.push({ pathname: '/note', params: { id: item.id } })} />
            <Button title="Delete" onPress={() => remove(item.id)} />
          </View>
        )}
      />
      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}
