import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('<LoginScreen /> Tests', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('should show itself correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch startLoginScreen action', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('should dispatch startLogin with respective arguments', () => {
    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

    expect(startLoginEmailPassword).toBeCalledWith('nando@gmail.com', '123456');
  });
});
