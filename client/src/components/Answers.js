import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getQuestions, deleteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';

class Answers extends Component {
    render() {
        return (
            <div className="bot">
            <Container>
                <Button outline color="primary" className="mt-s">primary</Button>{' '}
                <Button outline color="secondary" className="mt-s">secondary</Button>{' '}
                <Button outline color="success" className="mt-s">success</Button>{' '}
                <Button outline color="info" className="mt-s">info</Button>{' '}
                <Button outline color="warning" className="mt-s">warning</Button>{' '}
                <Button outline color="danger" className="mt-s">danger</Button>
            </Container>
            </div>
        );
    }
}

export default Answers;