import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { addDoc, collection, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Note() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, 'notes', id)).then((result) => {
      if (result.exists()) {
        setTitle(result.data().title);
        setContent(result.data().content);
      } else {
        setError('Cannot find note');
      }
      setLoading(false);
    }).catch((e) => {
      setError(e.message);
      setLoading(false);
    });
  }, [id]);

  async function save() {
    if (!title) {
      setError('Enter a title');
      return;
    }
    try {
      if (id) {
        await updateDoc(doc(db, 'notes', id), { title, content });
      } else {
        await addDoc(collection(db, 'notes'), {
          title,
          content,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          favorite: false,
        });
      }
      router.back();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>{id ? 'Edit Note' : 'Add Note'}</Text>
      {loading ? <Text>Loading...</Text> : (
        <>
          <TextInput style={{ borderWidth: 1, padding: 8, marginTop: 10 }} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={{ borderWidth: 1, padding: 8, height: 120, marginTop: 10 }} placeholder="Content" value={content} onChangeText={setContent} multiline />
          <Text>{error}</Text>
          <Button title="Save" onPress={save} />
        </>
      )}
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
