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
//import { addQuestion } from '../actions/questionActions';


class QuestionModal extends Component {
    state = {
        modal: false,
        question: '',
        tag: '',
        answer: [],
        link: []
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


        let choices = this.state.answer.split(',');
        let linkTypes = this.state.link.split(',');
       let a = [];
        for(let i = 0; i < choices.length; i++){

            let diffLinks = linkTypes[i].split(":");

            a[i] = 
             {
                content : 
                {
                    id: this.state.tag + " " + choices[i],
                    body: choices[i]
                },
                link : {
                    dbref: diffLinks[0],//.split(' ')[0],
                    type: diffLinks[1]//.split(' ')[1]
                }
            }
        }
        

        const q = {
            tag: this.state.tag,
            question: this.state.question,
            answers: a
        }

        console.log(q);

       axios({
            method: 'post',
            url: 'https://nameless-depths-96465.herokuapp.com/admin/question',
            data: q
        
        })
        .then((response) => {
            this.setState(
              
            console.log(response.data))
        }, (error) => {
            console.log(error);
        });

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
                                placeholder="Add Answer (a1,a2,a3, ...)"
                                onChange={this.onChange}
                                >
                                </Input>
                                <Label for = "link">Link</Label>
                                <Input
                                type="text"
                                name="link"
                                id="link"
                                placeholder="Add Links (DBref1 Type1, DBref2 Type2, ...)"
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

export default connect(mapStateToProps)(QuestionModal);