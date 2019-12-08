import React, { Component } from 'react';
import axios from 'axios';
//import { render } from 'react-dom';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
//import { getQuestions, deleteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';
//import { getCall } from './test';


class QuestionList extends Component {

    constructor(props){
        super(props);
    this.state = {
        questions: [],
        isLoading: false,
        error: null,
        singleQuestion: []
    };
}

     componentDidMount() {

        axios.get('https://nameless-depths-96465.herokuapp.com/admin/question', {params:{option: '0'}})
        .then((response) => {
            this.setState(
                {
                    questions: response.data,
                    isLoading: false
                },
            console.log(response.data))
        }, (error) => {
            console.log(error);
        });
    }

    onDeleteClick = (tag) => {
        alert("Pressed Delete: " + tag);
       
        axios({
            method: 'delete',
            url: 'https://nameless-depths-96465.herokuapp.com/admin/question',
            params: {option: '1', name: tag}
        })
        .then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error);
        });
    }

    onInfoClick = (_id, question, tag, type, dbref) => {
        alert("ID: "+_id+"\nQuestion: "+question+"\nTag: "+tag+"\nType: "+type+"\nLink: "+dbref);
    }

    render() {
        //question is entire state object, questions is array inside state
        //const { questions } = this.props.question;
        const {questions} = this.state;
        console.log("State: ", questions);

        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="question-list">
                        {
                        /*
                        //MongoDB uses "_id" instead of "id"
                        */
                        }
                        {questions.map(({_id, tag, question, answers}) => 
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, tag)}
                                    >
                                        &times;
                                    </Button>
                                    <Button
                                        className="more-info"
                                        color=""
                                        size="sm"
                                        onClick={this.onInfoClick.bind(this, _id, question, tag, answers[0].link[0].type, answers[0].link[0].dbref)}
                                    >
                                        {question}
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

/*QuestionList.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}*/

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(
    mapStateToProps
    //{ getQuestions, deleteQuestion }
    )(QuestionList);