import { combineReducers } from 'redux';
import rootReducer from './Reducers'
import formReducer from './FormReducer'
import authReducer from './AuthReducer'

export default combineReducers({ rootReducer, form_reducer:formReducer, auth_reducer:authReducer })

