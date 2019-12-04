import React, { Component } from 'react';
import { Container, Button, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FinalCard from './FinalCard';

class Answers extends Component {
    state = {
        val: [0]
    }

    
    step = () => {
        const data = this.props.question;
        const link = data.questions[0].answers[0].link[0].dbref;
        const type = data.questions[0].answers[0].link[0].type;

        if(this.state.val[0] >= 100){
            //Is Complete
        }
        else{
            //Update Progress Bar
            this.setState({
                val: [this.state.val[0] + 25]
            })
            //Call Next Question and get answers loaded into array
            this.props.getQuestions(link, type);
            this.createAnswers();
        }
    }

    createAnswers(){
        const ans = [];
        const { questions } = this.props.question;
        const content = questions[0].answers;
        content.forEach(element => {
            ans.push(element.content[0]);
        });
        return ans;
    }

    saveSelection(select){
        const selections = [];
        selections.push(select);
        console.log("Selected Answers: ", selections);
    }

    render() {
        const { questions } = this.props.question;
        const val = this.state.val;
        const barVal = [String(this.state.val)];
        let ans = this.createAnswers();

        return (
            <div>
            <Container>
                <h2>{questions[0].question}</h2>
            </Container>
            <Container className="answers">
            {
            //<FinalCard/>
            }

            {ans.map(({_id, body}) =>
                <CSSTransition key={_id} timeout={500} classNames="fade">
                        <Button 
                            key={_id} 
                            outline color="primary" 
                            className="answerButtons"
                            onClick={this.saveSelection(body)}>
                        {body}
                        </Button>
                </CSSTransition>
            )} 
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