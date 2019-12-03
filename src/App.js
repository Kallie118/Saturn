import React, { Component } from 'react';
import Navbar from './pages/navbar';
import Footer from './pages/footer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }


    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js

  render() {
    return (
        <div>
          <Navbar />
          <Footer />
         
        </div>
    );
  }
}

export default App;