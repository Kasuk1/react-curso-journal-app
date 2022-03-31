import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { firebase } from '../../firebase/firebase-config';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react/dist/pure';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('<AppRouter /> Tests', () => {
  test('should call login if authenticated', async () => {
    let user;

    await act(async () => {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword('test@testing.com', '123456');
      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith('o3u3foFVLRN9TSZAnmTsN4pHRcv2', null);
  });
});
