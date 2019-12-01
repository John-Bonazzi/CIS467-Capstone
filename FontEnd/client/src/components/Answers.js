import React, { Component } from 'react';
import { Container, Button, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionActions';
import FinalCard from './FinalCard';

class Answers extends Component {
    state = {
        val: [0]
    }
    
    step = () => {
        this.setState({
            val: [this.state.val[0] + 25]
        })
    }

    render() {
        const { questions } = this.props.question;
        const answers = [questions[0].answers[0].content[0]];
        const val = this.state.val;
        const barVal = [String(this.state.val)];
        return (
            <div>
            <Container className="answers">
            {
            //<FinalCard/>
            }
                {answers.map(({_id, body}) => 
                    <Button key={_id} outline color="primary" className="answerButtons">{body}</Button>
                )}
                <Button outline color="primary" className="answerButtons">No I have Not</Button>
                    <Button outline color="primary" className="answerButtons">Yes I have</Button>
            </Container>
            <Container className="progressBar">
                {val.map((value) =>
                    <div key="1" className="text-center">{value/25} /4</div>
                )}
                {barVal.map((value) =>
                    <Progress multi>
                        <Progress bar animated value={value}></Progress>
                    </Progress>
                )}
            </Container>
            <Container className="nBotAlt">
            <Button
                color="dark"
                style={{marginTop: '2rem'}}
                onClick={this.step}
                block
                >
                    Next
            </Button>
            </Container>
            </div>
        );
    }
}

Answers.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(mapStateToProps, {getQuestions})(Answers);