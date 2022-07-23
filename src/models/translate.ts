import Realm from 'realm';
const {UUID} = Realm.BSON;

export const SENTENCE_SCHEMA = 'Sentences';

// interface schemaInterface {
//   id: string;
//   sentence: string;
//   createdAt: Date;
// }

export const SentenceSchema = {
  name: SENTENCE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    sentence: 'string',
    createdAt: 'date',
  },
};

const databaseOptions = {
  schema: [SentenceSchema],
  schemaVersion: 6,
};

const realm = new Realm(databaseOptions);

export const create = (sentence: string) => {
  const data = {
    id: new UUID().toHexString(),
    sentence,
    createdAt: new Date(),
  };

  realm.write(() => {
    realm.create(SENTENCE_SCHEMA, data);
  });
};

export const getAll = () => realm.objects(SENTENCE_SCHEMA);
