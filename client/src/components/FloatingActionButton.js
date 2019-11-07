import React, { Component } from 'react';
import { Container, Button, Link } from 'react-floating-action-button'
import ChatModal from './ChatModal';

class FloatingActionButton extends Component {
    render() {
        return(
            <div>
                <Container>
                    <ChatModal/>
                    <Button
                        tooltip="Click Here To Chat!"
                        styles={{backgroundColor: "#0095ff"}}
                        icon=""
                        rotate={true}
                        onClick={ChatModal.toggle}>
                    </Button>
                </Container>
            </div>
        );
    }
}


export default FloatingActionButton;