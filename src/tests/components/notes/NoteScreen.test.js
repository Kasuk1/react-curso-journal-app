import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
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
    active: {
      id: 1234,
      title: 'Hello',
      body: 'World',
      date: 0,
    },
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe('<NoteScreen /> Tests', () => {
  test('should show correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should fire the activeNote action', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hello again',
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      id: 1234,
      title: 'Hello again',
      body: 'World',
      date: 0,
    });
  });
});
