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
import OneQuestion from './OneQuestion';
import Answers from './Answers';
import { Container } from 'react-floating-action-button';
import { Button as FAB } from 'react-floating-action-button';


class ChatModal extends Component {
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
                <Container>
                <FAB
                        tooltip="Click Here To Chat!"
                        styles={{backgroundColor: "#0095ff"}}
                        icon=""
                        rotate={true}
                        onClick={this.toggle}>
                </FAB>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Grand Valley CIS</ModalHeader>
                    <ModalBody className = "chat-modal-body">
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <OneQuestion/>
                            </FormGroup>
                        </Form>
                        <Answers/>
                    </ModalBody>
                </Modal>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, {addQuestion})(ChatModal);