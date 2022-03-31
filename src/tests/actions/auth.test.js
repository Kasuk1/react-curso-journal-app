import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from '../../actions/auth';
import thunk from 'redux-thunk';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('auth actions Tests', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login and logout should create the respective action', () => {
    const actionLogin = login('fakeid123', 'Igor');
    const actionLogout = logout();

    expect(actionLogin).toEqual({
      type: types.login,
      payload: {
        uid: 'fakeid123',
        displayName: 'Igor',
      },
    });
    expect(actionLogout).toEqual({
      type: types.logout,
    });
  });

  test('should do the logout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test('should start startLoginEmailPassword', async () => {
    await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'o3u3foFVLRN9TSZAnmTsN4pHRcv2',
        displayName: null,
      },
    });
  });
});
