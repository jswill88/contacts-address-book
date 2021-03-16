import { createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import contactsReducer from './contactsReducer';
import activeContactReducer from './activeContactReducer';
import showFormReducer from './showFormReducer';

let reducers = combineReducers({
  contactsReducer,
  activeContactReducer,
  showFormReducer
});

const store = () => {
  return createStore(reducers, applyMiddleware(thunk));
}

export default store();