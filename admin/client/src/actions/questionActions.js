import axios from 'axios';
import { ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from './types';

/*//FETCH http using axios dispatch
export const getQuestions = () => dispatch => {
    //set loading from false to true
    dispatch(setQuestionsLoading());

    //get database path to database connector
    //then get 'name' from res.data
 
        axios.get('http://localhost:5000/admin/question', {data: {option: '0'}, mode: "no-cors"})
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
};

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
    }*/