import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Progress } from 'reactstrap';

class Answers extends Component {
    render() {
        return (
            <div>
            <Container className="nBotAlt">
            <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
                >
                    Next
            </Button>
            </Container>
            <Container className="bot">
                <Button outline color="primary" className="mt-s">Yes</Button>{' '}
                <Button outline color="secondary" className="mt-s">No</Button>{' '}
                <Button outline color="success" className="mt-s">Currently Applying</Button>{' '}
            </Container>
            <Container className="pBot">
                <Progress animated value="25"/>
            </Container>
            </div>
        );
    }
}

export default Answers;