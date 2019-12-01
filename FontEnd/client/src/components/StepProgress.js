import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionActions';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import  {Step} from '@material-ui/core';


class StepProgress extends Component {
    render() {
        return (
            <div>
                <Stepper>
                    <Step>Step</Step>
                </Stepper>
            </div>
        );
    }
}

StepProgress.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(mapStateToProps, {getQuestions})(StepProgress);