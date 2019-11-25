import React, { Component } from 'react';
import axios from 'axios';
//import { render } from 'react-dom';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';
//import { getCall } from './test';

//const API = 'http://localhost:5000/admin/question';
//const DEFAULT_QUERY = 'redux';
class QuestionList extends Component {

    constructor(props){
        super(props);
    this.state = {
        questions: [],
        isLoading: false,
        error: null,
    };
}

     componentDidMount() {
        //alert("Need to grab questions here");

        axios.get('http://localhost:5000/admin/question', {params:{option: '0'}})
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

    onDeleteClick = (_id) => {
        alert("Pressed Delete");
        //this.props.deleteQuestion(_id);
        //option : 1, _id : _id
        axios.delete('http://localhost:5000/admin/question', {params:{option: '1', id: _id}})
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

    onInfoClick = (_id) => {

        alert("Pressed More info click");
        //this.props.getQuestions();
        axios.get('http://localhost:5000/admin/question', {params:{option: '1', id: _id}})
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

    render() {
        //question is entire state object, questions is array inside state
        //const { questions } = this.props.question;
        const {questions} = this.state;

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