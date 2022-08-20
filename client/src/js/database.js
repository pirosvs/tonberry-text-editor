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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // is editor the right thing for all of these? should some be the text? should they be jate?
  console.log('Post');
  const editorDb = await openDB('editor', 1);
  const tx = editorDb.transaction('editor', 'readwrite');
  const store = tx.objectStore('editor');
  // is the below line correct?
  const request = store.add({ content: content});
  const result = await request;
  console.log('Data saved to the database', result);
}; console.error('putDb not implemented');
// insert error into function


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // is editor the right thing for all of these? should some be the text? should they be jate?
  console.log('GET all from the database');
  const editorDb = await openDB('editor', 1);
  // should this be readonly?
  const tx = editorDb.transaction('editor', 'readonly');
  const store = tx.objectStore('editor');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}; console.error('getDb not implemented');
// insert error into function

initdb();
