import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from '../../actions/ui';
import { types } from '../../types/types';

describe('ui actions Tests', () => {
  test('should work all these actions', () => {
    const actionSetError = setError('HELP!!!');
    const actionRemoveError = removeError();
    const actionStartLoading = startLoading();
    const actionFinishLoading = finishLoading();

    expect(actionSetError).toEqual({
      type: types.uiSetError,
      payload: 'HELP!!!',
    });
    expect(actionRemoveError).toEqual({
      type: types.uiRemoveError,
    });
    expect(actionStartLoading).toEqual({
      type: types.uiStartLoading,
    });
    expect(actionFinishLoading).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
