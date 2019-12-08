import React, { Component } from 'react';
import axios from 'axios';
//import { render } from 'react-dom';
import { Container, ListGroup, ListGroupItem, Button, Media } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';


class CourseList extends Component {

    constructor(props){
        super(props);
    this.state = {
        courses: [],
        isLoading: false,
        error: null,
        singleQuestion: []
    };
}

     componentDidMount() {

        axios.get('https://nameless-depths-96465.herokuapp.com/admin/course', {params:{option: '0'}})
        .then((response) => {
            this.setState(
                {
                    courses: response.data,
                    isLoading: false
                },
            console.log(response.data))
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        //question is entire state object, questions is array inside state
        //const { questions } = this.props.question;
        const {courses} = this.state;
        console.log("Courses: ", courses);

        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="question-list">
                        {courses.map(({_id, tag, description, href}) => 
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Media>
                                    <Media body>
                                    <Media heading>
                                    {tag}
                                    </Media>
                                    {description}
                                    <Media href={href}>
                                    {href}
                                    </Media>
                                    </Media>
                                </Media>
                                </ListGroupItem>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(
    mapStateToProps
    )(CourseList);