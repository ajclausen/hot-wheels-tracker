import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function initializeDatabase() {
  const db = await open({
    filename: ':memory:', // For development. Use a file path in production
    driver: sqlite3.Database
  });

  // Initialize schema
  const schema = await readFile(join(__dirname, 'schema.sql'), 'utf-8');
  await db.exec(schema);

  return db;
}