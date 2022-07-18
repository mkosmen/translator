import Realm from 'realm';
const {UUID} = Realm.BSON;

const DB_NAME = 'Sentences';

const repository = new Realm({
  schemaVersion: 2,
  schema: [
    {
      name: DB_NAME,
      primaryKey: '_id',
      properties: {
        _id: 'uuid',
        sentence: 'string',
        createdAt: 'date',
      },
    },
  ],
});

export const create = (sentence: string) => {
  repository.write(() => {
    repository.create(DB_NAME, {
      _id: new UUID(),
      sentence,
      createdAt: new Date(),
    });
  });
};

export const getAll = () => {
  return repository.objects(DB_NAME);
};

export default repository;
