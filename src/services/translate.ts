import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {TranslationItem, SentenceItem} from '@models/index';
export const tableName = 'translations';

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        rowid INTEGER PRIMARY KEY,
        sentence text not null,
        source text not null,
        target text not null
    );`;

  await db.executeSql(query);
};

export const getAll = async (
  db: SQLiteDatabase,
): Promise<SentenceItem[] | undefined> => {
  try {
    const items: SentenceItem[] = [];

    const results = await db.executeSql(`SELECT * FROM ${tableName}`);

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });

    return items;
  } catch (error) {
    throw Error('Failed to get translationItems !!!');
  }
};

export const create = async (
  db: SQLiteDatabase,
  translationItem: TranslationItem,
) => {
  const insertQuery = `INSERT INTO ${tableName}(sentence, source, target)
  values ('${translationItem.sentence}', '${translationItem.source}', '${translationItem.target}')`;

  return db.executeSql(insertQuery);
};

export const remove = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;

  await db.executeSql(deleteQuery);
};

export const isExist = async (
  db: SQLiteDatabase,
  translationItem: {sentence: string; source: string},
) => {
  const insertQuery = `select 1 from ${tableName}
  where sentence = '${translationItem.sentence}' and source = '${translationItem.source}' limit 1`;

  const results = await db.executeSql(insertQuery);

  return results[0].rows.length > 0;
};

export const getOne = async (
  db: SQLiteDatabase,
  rowid: number,
): Promise<TranslationItem | undefined> => {
  const insertQuery = `select * from ${tableName} where rowid = '${rowid}'`;

  const results = await db.executeSql(insertQuery);

  return results[0].rows.item(0);
};
