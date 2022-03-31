import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';
import { startLogout } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const initState = {
  auth: {
    uid: 'TESTING',
    name: 'Igor',
  },
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

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe('<Sidebar /> Tests', () => {
  test('should show correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call logout action - startLogout', () => {
    wrapper.find('button').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
  });

  test('should call - startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();

    expect(startNewNote).toHaveBeenCalled();
  });
});
