import React, { Component } from 'react';
import{
   /* Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
   
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,*/
    Button
} from 'reactstrap';

class AppChatButton extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onChatClick(){
        alert('Clicked Chat');
        
    }

    render() {
        return(
            <div>
                <Button
                variant = "contained"
                color='dark'
                style={{diplay: 'flex', justifyContent: 'right', marginBottom: '2rem'}}
                onClick={this.onChatClick}>
                    Chat
                </Button>
            </div>
        );
    }
}


export default AppChatButton;