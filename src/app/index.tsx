import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChangeEntry } from '@/models/ChangeEntry';
import { getAllChangeEntries } from '@/services/changeEntryService';

export default function HomeScreen() {
  const [entries, setEntries] = useState<ChangeEntry[]>([]);

  useEffect(() => {
    async function loadEntries() {
      const storedEntries = await getAllChangeEntries();
      setEntries(storedEntries);
    }

    loadEntries();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lofty</Text>
        <Text style={styles.subtitle}>Your Change Log</Text>

        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Change</Text>
        </Pressable>

        {entries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text>No changes recorded yet.</Text>
            </View>
        ) : (
            <ScrollView style={styles.list}>
              {entries.map(entry => (
                  <View key={entry.id} style={styles.entry}>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <Text style={styles.entryDate}>{entry.changeDate}</Text>
                    <Text>{entry.description}</Text>
                  </View>
              ))}
            </ScrollView>
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  entry: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  entryDate: {
    marginTop: 4,
    marginBottom: 8,
  },
  addButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});