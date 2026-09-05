import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const db = await SQLite.openDatabaseAsync('lofty.db');

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS change_entries (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      change_date TEXT NOT NULL,
      created_at_utc TEXT NOT NULL,
      updated_at_utc TEXT NOT NULL
    );
  `);

    return db;
}


export async function testDatabase() {

    console.log('Running database test...');

    const db = await SQLite.openDatabaseAsync('lofty.db');

    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    await db.runAsync(
        `INSERT INTO change_entries
      (id, title, description, change_date, created_at_utc, updated_at_utc)
     VALUES (?, ?, ?, ?, ?, ?)`,
        id,
        'Test Change',
        'This entry verifies local SQLite persistence.',
        '2026-08-22',
        now,
        now
    );

    const rows = await db.getAllAsync('SELECT * FROM change_entries');

    console.log(rows);
}