import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { addQuestion } from '../actions/questionActions';


class QuestionModal extends Component {
    state = {
        modal: false,
        question: '',
        tag: '',
        answer: []

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newQuestion = {
            question: this.state.question,
            tag: this.state.tag,
            answer: this.state.answer
        }

        //Add question via addQuestion action
        //this.props.addQuestion(newQuestion);
        alert('Add question here');

        axios.post('http://localhost:5000/admin/question', {params:{option: '1', body: newQuestion}})
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



        /*{
            "tag": "Initial",
            "question": "Welcome to the Exploration bot experience!",
            "answer":[
                {
                    "content":[{
                        "body": "Start!"
                    }],
                    "link":[
                        {
                            "dbref": "5dc511aa878f510b88cf0160",
                            "type": "Question"
                    }]
                }
            ]
        }*/
        //Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                color='dark'
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}>
                    Add Question
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for = "question">Question</Label>
                                <Input
                                type="text"
                                name="question"
                                id="question"
                                placeholder="Add Question"
                                onChange={this.onChange}
                                >
                                </Input>
                                <Label for = "tag">Tag</Label>
                                <Input
                                type="text"
                                name="tag"
                                id="tag"
                                placeholder="Add Tag"
                                onChange={this.onChange}
                                >
                                </Input>
                                <Label for = "answer">Answer</Label>
                                <Input
                                type="text"
                                name="answer"
                                id="answer"
                                placeholder="Add Answer (answer 1, answer 2, ...)"
                                onChange={this.onChange}
                                >
                                </Input>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >
                                    Add Question
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, {addQuestion})(QuestionModal);