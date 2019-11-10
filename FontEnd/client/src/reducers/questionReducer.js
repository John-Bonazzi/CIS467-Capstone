import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from '../actions/types';

const initialState = {
    questions: [],
    loading: false
};

//Spread operator ...state is because we cannot mutate state
//We have to recreate it, and ...state returns the entire state
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.payload)
            };
         case ADD_QUESTION:
            return{
                ...state,
                questions: [action.payload, ...state.questions]
            };
        case QUESTIONS_LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
}