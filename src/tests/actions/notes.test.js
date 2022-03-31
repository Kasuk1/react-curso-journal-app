import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://hola-mundo.com/image.jpg';
    // return Promise.resolve('https://hola-mundo.com/image.jpg');
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: 'A6b9DlZmSDnIu5C6GbJE',
      title: 'Hola',
      body: 'Mundo',
    },
  },
};

let store = mockStore(initState);

describe('notes actions tests', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('should create a new note', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;
    db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test('should upload notes - startLoadingNotes', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('should update note - saveNote', async () => {
    const note = {
      id: 'A6b9DlZmSDnIu5C6GbJE',
      title: 'Hello',
      body: 'boyzz',
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    console.log(actions);
    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test('should upload file updating url of the entry / startUploading', async () => {
    const file = new File([], 'image.jpg');
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc(`/TESTING/journal/notes/${initState.notes.active.id}`)
      .get();
    expect(docRef.data().url).toBe('https://hola-mundo.com/image.jpg');
  });
});
