import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
} from 'reactstrap';
import { connect } from 'react-redux';
import OneQuestion from './OneQuestion';
import Answers from './Answers';
import { Container } from 'react-floating-action-button';
import { Button as FAB } from 'react-floating-action-button';
import { getQuestions } from '../actions/questionActions';
import PropTypes from 'prop-types';


class ChatModal extends Component {

    componentDidMount(){
        this.props.getQuestions("Initial", "Question");
    }

    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
        this.props.getQuestions("Initial", "Question");
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
                        icon= "FaDiscourse"
                        rotate={true}
                        onClick={this.toggle}>
                </FAB>
                </Container>
                <Modal
                    className="modal-container"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    backdrop={false}
                >
                    <ModalHeader toggle={this.toggle}>Exploration Bot</ModalHeader>
                    <ModalBody className = "chat-modal-body">
                        <Answers/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ChatModal.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, {getQuestions})(ChatModal);