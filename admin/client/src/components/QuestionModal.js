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
import { addQuestion } from '../actions/questionActions';


class QuestionModal extends Component {
    state = {
        modal: false,
        name: ''
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
            name: this.state.name
        }

        //Add question via addQuestion action
        this.props.addQuestion(newQuestion);

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
                                name="name"
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