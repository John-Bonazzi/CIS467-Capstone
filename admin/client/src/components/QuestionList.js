import React, { Component } from 'react';
//import axios from 'axios';
//import { render } from 'react-dom';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';
//import { getCall } from './test';

class QuestionList extends Component {

    state = {
        persons: []
    }

     componentDidMount() {
        alert("Need to grab questions here");

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

        this.props.getQuestions();

       /*let allQuestions = [
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
        ];*/
    }

    onDeleteClick = (_id) => {
        alert("Pressed Delete");
        //this.props.deleteQuestion(_id);
    }

    onInfoClick = (_id) => {

        alert("Pressed More info click");
        //this.props.getQuestions();
    }

    render() {
        //question is entire state object, questions is array inside state
        const { questions } = this.props.question;

        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="question-list">
                        {
                        /*
                        //MongoDB uses "_id" instead of "id"
                        */
                        }
                        {questions.map(({_id, tag}) => 
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                    </Button>
                                    <Button
                                        className="more-info"
                                        color=""
                                        size="sm"
                                        onClick={this.onInfoClick.bind(this, _id)}
                                    >
                                        {tag}
                                    </Button>
                                    
                                </ListGroupItem>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

QuestionList.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(
    mapStateToProps, 
    { getQuestions, deleteQuestion }
    )(QuestionList);