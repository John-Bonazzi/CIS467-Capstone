import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionActions';
import PropTypes from 'prop-types';

class FinalCard extends Component {
    render(){
        const { questions } = this.props.question;
        const link = [questions[0].answers[0].link[0]];
        return (
            <div>
            <Card className="card-witdth">
                <CardImg top width="100%" src="https://www.cis.gvsu.edu/wp-content/uploads/2019/11/SCIS_text.png" alt="Card image cap" />
                <CardBody>
                {(link.map(({dbref}) =>
                <CardTitle>{dbref}</CardTitle>
                ))}
                <CardText>Internship in a computing situation with individual faculty supervision to allow students to apply academic knowledge to actual and professional experience.</CardText>
                </CardBody>
            </Card>
            </div>
        )
    }
};

FinalCard.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(mapStateToProps, {getQuestions})(FinalCard);