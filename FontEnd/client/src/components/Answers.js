import React, { Component } from 'react';
import { Container, Button, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionActions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FinalCard from './FinalCard';

class Answers extends Component {
    state = {
        val: [0],
        selections: [],
        isOpen: false
    }

    showFinal(){
        this.setState({
            isOpen: true
        });
    }

    hideFinal(){
        this.setState({
            isOpen: false
        });
    }

    step = (event) => {
        const data = JSON.parse(event.target.value);
        console.log("Event Val: ",data);
        const link = data.dbref;
        const type = data.type;
        if(link === "Skill"){
            //Initial Question
            this.props.getQuestions(link, type);
            console.log("GetQuestions: ", link, type);
            this.createAnswers();
        }
        else if(type === "Question"){
            //Update Progress Bar
            this.setState({
                val: [this.state.val[0] + 25]
            })
            //Call Next Question and get answers loaded into array
            this.props.getQuestions(link, type);
            console.log("GetQuestions: ", link, type);
            this.createAnswers();
        }
        else{
            //Type = Course
            this.setState({
                val: [100]
            })
            this.props.getQuestions(link, type);
            this.showFinal();
            console.log("GetQuestions: ", link, "Course");
            }
    }

    createAnswers(){
        const ans = [];
        const { questions } = this.props.question;
        const content = questions[0].answers;
        if(content == undefined){
            console.log("Is course");
        }
        else{
            content.forEach(element => {
                ans.push(element);
            });
        }
        return ans;
    }

    render() {
        const { questions } = this.props.question;
        const val = this.state.val;
        const barVal = [String(this.state.val)];
        let ans = this.createAnswers();

        return (
            <div>
            <Container>
                <h4>{questions[0].question}</h4>
                {this.state.isOpen ?
                    <FinalCard/>
                : null}
            </Container>
            <Container className="answers">
            {ans.map(({content, link}) =>
                <CSSTransition key={content[0]._id} timeout={500} classNames="fade">
                        <Button 
                            key={content[0]._id} 
                            outline color="primary" 
                            className="answerButtons"
                            onClick={this.step}
                            value = {JSON.stringify(link[0])}>
                        {content[0].body}
                        </Button>
                </CSSTransition>
            )} 
            </Container>

            <Container className="progressBar">
                {val.map((value) =>
                    <div key="1" className="text-center">{value/25} /4</div>
                )}
                {barVal.map((value) =>
                    <Progress multi key="multi">
                        <Progress key="bar" bar animated value={value}></Progress>
                    </Progress>
                )}
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