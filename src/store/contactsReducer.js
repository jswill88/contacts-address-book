import axios from 'axios';

const url = 'https://avb-contacts-api.herokuapp.com/contacts/';

const SET_CONTACTS = 'SET_CONTACTS'
const UPDATE_ONE = 'UPDATE_ONE'
const SET_ACTIVE_CONTACT = 'SET_ACTIVE_CONTACT';
const ADD_ONE = 'ADD_ONE';
const REMOVE_ONE = 'REMOVE_ONE';
const SET_SHOW_FORM = 'SET_SHOW_FORM';

const contactsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_CONTACTS:
      return payload;
    case UPDATE_ONE:
      return state.map(contact => contact.id === payload.id ? payload : contact)
    case ADD_ONE:
      return [...state, payload]
    case REMOVE_ONE:
      return state.filter(({ id }) => id !== payload);
    default:
      return state;
  }
}


export const getContacts = () => {
  return async dispatch => {
    const payload = await fetchApi(
      'get',
      'paginated'
    )
    dispatch({
      type: SET_CONTACTS,
      payload: payload.contacts,
    })
  }
}

export const updateContact = updated => {
  const { firstName, lastName, emails, id } = updated;
  return async dispatch => {
    await fetchApi(
      'put',
      id,
      {
        firstName,
        lastName,
        emails
      }
    )
    dispatch({
      type: UPDATE_ONE,
      payload: updated,
    })
    reset(dispatch);
  }
}

// save new
export const newContact = contact => {
  return async dispatch => {
    const newContact = await fetchApi(
      'post',
      '',
      contact
    )
    dispatch({
      type: ADD_ONE,
      payload: newContact,
    })
    reset(dispatch);
  }
}

export const deleteContact = id => {
  return async dispatch => {
    await fetchApi(
      'delete',
      id
    )
    dispatch({
      type: REMOVE_ONE,
      payload: id,
    })
    reset(dispatch);
  }
}

const reset = (dispatch) => {

  dispatch({
    type: SET_ACTIVE_CONTACT,
    payload: {},
  })

  dispatch({
    type: SET_SHOW_FORM,
    payload: false,
  })
}

const fetchApi = async (method, params = '', data = {}) => {
  try {
    const results = await axios({
      url: `${url}${params}`,
      method,
      data
    })
    return results.data;
  } catch (e) {
    console.error(e)
  }
}
export default contactsReducer;