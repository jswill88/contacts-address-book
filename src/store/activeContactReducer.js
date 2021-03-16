const SET_ACTIVE_CONTACT = 'SET_ACTIVE_CONTACT';

const activeContactReducer = (state = {}, { type, payload }) => {
  switch(type) {
    case SET_ACTIVE_CONTACT:
      console.log(payload)
      return payload;
    default: 
      return state;
  }
}

export const setActiveContact = newActiveContact => ({
  type: SET_ACTIVE_CONTACT,
  payload: newActiveContact,
})

export default activeContactReducer;