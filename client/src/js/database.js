import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const postDb = async (name, home, cell, email)  => {
  console.log('Post to the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

  const result = await request;
  console.log('Data saved to the database', result);
};
;

export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result?.value; 
};

initdb();
