import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionActions';
import PropTypes from 'prop-types';

class FinalCard extends Component {
    render(){
        const { questions } = this.props.question;
        console.log("Course: ", questions)
        const tag = questions[0].tag;
        const desc = ""+questions[0].description;
        const link = questions[0].href;

        return (
            <div> 
                <Card>
                    <CardImg top width="100%" src="https://www.cis.gvsu.edu/wp-content/uploads/2019/11/SCIS_text.png"/>
                    <CardBody>
                        <CardTitle style={{fontWeight: "bold"}}>{tag}</CardTitle>
                        <a href = {link}>{link}</a>
                        <CardText className="card-text">{desc}</CardText>
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