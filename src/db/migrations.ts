import { SQLiteDatabase } from 'expo-sqlite';
import { databaseSchema } from './schema';
import { seedDatabase } from './seed';

export default async function initDatabase(db: SQLiteDatabase) {
    await db.execAsync('PRAGMA foreign_keys = ON;'); // Enable foreign key support
    const database_version = 1.0; // Update this version number whenever you make changes to the database schema
    const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    let current_version = result?.user_version || 0;

    if (current_version >= database_version) { return }

    if (current_version === 0) {
        await db.execAsync(databaseSchema);
        await seedDatabase(db);
        current_version = 1.0;
    }

    await db.execAsync(`PRAGMA user_version = ${database_version}`);
}