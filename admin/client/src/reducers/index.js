import { combineReducers } from 'redux';
import questionReducer from './questionReducer.js'


export default combineReducers({
    question: questionReducer
});