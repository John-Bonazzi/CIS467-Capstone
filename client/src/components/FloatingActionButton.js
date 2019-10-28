import React, { Component } from 'react';
import { Container, Button, Link } from 'react-floating-action-button'

class FloatingActionButton extends Component {
    render() {
        return(
            <div>
                <Container>
                    <Button
                        tooltip="Click Here To Chat!"
                        styles={{backgroundColor: "#0095ff"}}
                        icon=""
                        rotate={true}
                        onClick={() => alert('FAB Rocks!')}>
                    </Button>
                </Container>
            </div>
        );
    }
}


export default FloatingActionButton;