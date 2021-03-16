const SET_SHOW_FORM = 'SET_SHOW_FORM';

const showFormReducer = (state = false, { type, payload }) => {
  return type === SET_SHOW_FORM ?  payload : state;
}

export const setShowForm = show => ({
  type: SET_SHOW_FORM,
  payload: show,
});

export default showFormReducer;