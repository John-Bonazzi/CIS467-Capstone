import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ChatModal from './components/ChatModal';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={store}>
        <div className="App">
          <Container>
            <ChatModal/>
          </Container>
        </div>
      </Provider>
      </div>
    );
  }
}

export default App;
