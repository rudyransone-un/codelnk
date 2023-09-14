import { desc } from 'drizzle-orm';

import { db } from '../db/db';
import { files } from '../db/schema/file';
import type { File, FileInsert } from '../db/schema/file';

export async function getLastCreatedFile() {
  try {
    return db
      .select()
      .from(files)
      .orderBy(desc(files.timestamp))
      .limit(1);
  } catch (e) {
    console.error(e);
  }
}

export async function uploadFile(file: FileInsert) {
  try {
    await db.insert(files).values(file).run();
  } catch (e) {
    console.error(e);
  }
}

export async function getFiles() {
  try {
    return db.select().from(files).all();
  } catch (e) {
    console.error(e);
  }
}
