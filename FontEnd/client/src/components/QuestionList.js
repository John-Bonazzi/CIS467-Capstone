import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';

class QuestionList extends Component {

    componentDidMount() {
        this.props.getQuestions();
    }

    onDeleteClick = (_id) => {
        this.props.deleteQuestion(_id);
    }

    render() {
        //question is entire state object, questions is array inside state
        const { questions } = this.props.question;
        const answers = [questions[0].answers[0].content[0]];
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="question-list">
                        {
                        /*
                        //MongoDB uses "_id" instead of "id"
                        */
                        }
                        {answers.map(({_id, body}) => 
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
                                    {body}
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