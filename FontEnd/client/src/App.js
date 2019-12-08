import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ChatModal from './components/ChatModal';
import { Container } from 'reactstrap';
import Image from './Icons/ciswebsite.PNG';
import AppNavbar from './components/AppNavbar';
import QuestionList from './components/QuestionList';
import QuestionModal from './components/QuestionModal';
import CourseList from './components/CourseList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container className="padding">
            <QuestionModal/>
            <h2>Questions</h2>
            <QuestionList/>
            <h2>Courses</h2>
            <CourseList/>
            <ChatModal/>
          </Container>
        </div>
      </Provider>
      {
      <img src={Image} className="img"/>
      }
      </div>
    );
  }
}

export default App;
