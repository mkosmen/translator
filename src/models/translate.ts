import Realm from 'realm';
// const {UUID} = Realm.BSON;

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const Sentence = {
  name: 'Sentence',
  properties: {
    id: 'string',
    text: 'string',
    source: 'string',
    target: 'string',
    createdAt: 'date',
  },
  primaryKey: 'id',
};

const databaseOptions = {
  // path: 'translator.realm',
  schema: [Sentence],
  schemaVersion: 3,
};

const realm = new Realm(databaseOptions);

type createProps = {
  text: string;
  source: string;
  target: string;
};
export const create = (props: createProps) => {
  try {
    realm.write(() => {
      const data = {
        id: uuid(),
        createdAt: new Date(),
        ...props,
      };

      console.log('record data', data);

      realm.create('Sentence', data);
    });
  } catch (errors) {
    console.log('create record error', errors);
  }
};

export const getAll = () => realm.objects('Sentence');
