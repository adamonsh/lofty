import * as Crypto from 'expo-crypto';
import * as SQLite from 'expo-sqlite';

import { ChangeEntry } from '@/models/ChangeEntry';

async function getDatabase() {
    return SQLite.openDatabaseAsync('lofty.db');
}



export async function createChangeEntry(
    title: string,
    description: string,
    changeDate: string
): Promise<ChangeEntry> {
    const db = await getDatabase();

    const id = Crypto.randomUUID();
    const now = new Date().toISOString();

    const entry: ChangeEntry = {
        id,
        title,
        description,
        changeDate,
        createdAtUtc: now,
        updatedAtUtc: now,
    };

    await db.runAsync(
        `INSERT INTO change_entries
      (id, title, description, change_date, created_at_utc, updated_at_utc)
     VALUES (?, ?, ?, ?, ?, ?)`,
        entry.id,
        entry.title,
        entry.description,
        entry.changeDate,
        entry.createdAtUtc,
        entry.updatedAtUtc
    );

    return entry;
}

export async function getAllChangeEntries(): Promise<ChangeEntry[]> {
    const db = await getDatabase();

    const rows = await db.getAllAsync<{
        id: string;
        title: string;
        description: string;
        change_date: string;
        created_at_utc: string;
        updated_at_utc: string;
    }>(
        `SELECT
      id,
      title,
      description,
      change_date,
      created_at_utc,
      updated_at_utc
     FROM change_entries
     ORDER BY change_date DESC`
    );

    return rows.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        changeDate: row.change_date,
        createdAtUtc: row.created_at_utc,
        updatedAtUtc: row.updated_at_utc,
    }));
}

export async function getChangeEntryById(
    id: string
): Promise<ChangeEntry | null> {
    const db = await getDatabase();

    const row = await db.getFirstAsync<{
        id: string;
        title: string;
        description: string;
        change_date: string;
        created_at_utc: string;
        updated_at_utc: string;
    }>(
        `SELECT
      id,
      title,
      description,
      change_date,
      created_at_utc,
      updated_at_utc
     FROM change_entries
     WHERE id = ?`,
        id
    );

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        title: row.title,
        description: row.description,
        changeDate: row.change_date,
        createdAtUtc: row.created_at_utc,
        updatedAtUtc: row.updated_at_utc,
    };
}

export async function updateChangeEntry(
    id: string,
    title: string,
    description: string,
    changeDate: string
): Promise<void> {
    const db = await getDatabase();
    const updatedAtUtc = new Date().toISOString();

    await db.runAsync(
        `UPDATE change_entries
     SET title = ?,
         description = ?,
         change_date = ?,
         updated_at_utc = ?
     WHERE id = ?`,
        title,
        description,
        changeDate,
        updatedAtUtc,
        id
    );
}

export async function deleteChangeEntry(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
        `DELETE FROM change_entries
     WHERE id = ?`,
        id
    );
}