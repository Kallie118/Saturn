import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }


    render() {
        if (this.state.loggedIn === true) {
            return (
                <div>
                    <h1>You are on the dashboard</h1>
                </div>
             )
        } else if (this.state.loggedIn === false) {
            console.log('YOU WERENT LOGGED IN')
            return <Redirect to='/' />
            
        } else {
            return null;
        }
    }

}

export default Dashboard;