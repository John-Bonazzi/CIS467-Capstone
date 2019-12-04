import axios from 'axios';
import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from './types';

//FETCH http using axios dispatch
export const getQuestions = (newlink, type) => dispatch => {
    //set loading from false to true
    dispatch(setQuestionsLoading());

    //get database path to database connector
    //then get 'name' from res.data

    axios
        .get ('https://nameless-depths-96465.herokuapp.com/user', {
            params: {
                newlink: newlink,
                type: type
            }
        })
        .then(res => 
            dispatch({
                type: GET_QUESTIONS,
                payload: [res.data]
            }),
        )
        .catch(e => {
            alert(e);
        })
};

/*
//Alternative Get request through Strictly URL
export const getQuestions = (newlink, type) => dispatch => {
    //set loading from false to true
    dispatch(setQuestionsLoading());

    //get database path to database connector
    //then get 'name' from res.data

    axios
        .get ('https://nameless-depths-96465.herokuapp.com/user'+'?newlink='+{newlink}+'&type='+{type})
        .then(res => 
            dispatch({
                type: NEXT_QUESTION,
                payload: [res.data]
            })
        )
        .catch(e => {
            alert(e);
        })
};
*/

//Post request to '/api/items' 
//pass along question name with res.data
export const addQuestion = question => dispatch => {
    axios
        .post('/api/questions', question)
        .then(res=>
            dispatch({
                type: ADD_QUESTION,
                payload: res.data
            }))
};

//send to reducer with payload of 'id'
export const deleteQuestion = id  => dispatch => {
    axios.delete(`api/questions/${id}`).then(res =>
        dispatch({
            type: DELETE_QUESTION,
            payload: id
        })
    )
};


//Sets questions loading from false to true
export const setQuestionsLoading = () => {
    return {
        type: QUESTIONS_LOADING
    }
}