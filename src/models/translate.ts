import Realm from 'realm';
const {UUID} = Realm.BSON;

const Sentence = {
  name: 'Sentence',
  properties: {
    _id: 'uuid',
    text: 'string',
    source: 'string',
    target: 'string',
    createdAt: 'date',
  },
  primaryKey: '_id',
};

const databaseOptions = {
  path: 'translator.realm',
  schema: [Sentence],
  schemaVersion: 2,
};

const realm = new Realm(databaseOptions);

type createProps = {
  text: string;
  source: string;
  target: string;
};
export const create = (props: createProps) => {
  try {
    const data = {
      _id: new UUID(),
      createdAt: new Date(),
      ...props,
    };

    console.log('record data', data);

    realm.write(() => {
      realm.create('Sentence', data);
    });
  } catch (errors) {
    console.log('create record error', errors);
  }
};

export const getAll = () => realm.objects('Sentence');
