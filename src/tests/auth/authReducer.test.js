import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('authReducer Tests', () => {
  test('should do login', () => {
    const initState = {};
    const action = {
      type: types.login,
      payload: {
        uid: '123214124',
        displayName: 'Igor',
      },
    };
    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: '123214124',
      name: 'Igor',
    });
  });

  test('should do logout', () => {
    const initState = {
      uid: '123214124',
      name: 'Igor',
    };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test('should do return the same state', () => {
    const initState = {
      uid: '123214124',
      name: 'Igor',
    };
    const action = {
      type: 'this doesn not exist',
    };
    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
