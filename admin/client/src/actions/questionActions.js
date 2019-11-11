import axios from 'axios';
import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from './types';

//FETCH http using axios dispatch
export const getQuestions = () => dispatch => {
    //set loading from false to true
    dispatch(setQuestionsLoading());

    //get database path to database connector
    //then get 'name' from res.data


    /*var d = {"option" : "0"};
        //let b = JSON ({"option" : "0"});
        axios({
            method : 'GET',

            url : 'http://localhost:5000/admin',

            headers: { 
            'Content-Type': 'application/json' },
            data: JSON.stringify(d),
            json: true
        }).then(res => {
            console.log(res);
            console.log(res.data);

            const persons = res.data;
            this.setState({ persons });
        });

        getCall();*/


        axios({
            method : 'get',
            url : 'http://localhost:5000/admin',
            headers: { 
            'Content-Type': 'application/json' },
            data: {option : "0"},
            json: true
        })
        .then(res => {
            console.log(res);
            //console.log(res.data);
            dispatch({
                type: GET_QUESTIONS,
                payload: [
                    {
                        "_id": "5dc510230007680b3e20ff79",
                        "tag": "Initial",
                        "question": "Initial element",
                        "__v": 0,
                        "answers": []
                    },
                    {
                        "_id": "5dc511aa878f510b88cf0160",
                        "tag": "test",
                        "question": "test answer element",
                        "answers": [
                            {
                                "body": "this is an answer connected to Initial",
                                "link": "5dc510230007680b3e20ff79"
                            }
                        ],
                        "__v": 0
                    },
                    {
                        "_id": "5dc6f31eef0a2906f2d12f3d",
                        "tag": "test2",
                        "question": "Slack example!!",
                        "answers": [
                            {
                                "body": "this is an answer connected to Initial",
                                "link": "5dc510230007680b3e20ff79"
                            },
                            {
                                "body": "this is an answer connected to test",
                                "link": "5dc511aa878f510b88cf0160"
                            }
                        ],
                        "__v": 0
                    }
                ]
            })}
        )
        
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
    }
}