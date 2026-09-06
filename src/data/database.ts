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