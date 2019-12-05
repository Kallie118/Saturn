import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            loading: true,
            user: {},
            userData: {},
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
                this.setState({ user: firebase.auth().currentUser });

                db.collection('users').doc(user.displayName).get().then(doc => {
                    if (doc.exists) {
                        this.setState({ userData: doc.data() });
                        this.setState({ loading: false })
                    } else {
                        console.log('Document does not exist.');
                    }
                });

            } else {
                this.setState({ loggedIn: false });
                this.setState({ loading: false })
            }
        });
    }


    render() {
        if (this.state.loading === true) {
            return null
        } else if (this.state.loggedIn === true) {
            return (

                // Your code goes below this
                <div>
                    <h1>You are on the dashboard</h1>
                </div>
                //and above this
            )
        } else if (this.state.loggedIn === false) {
            return <Redirect to='/' />
        } else {
            return null;
        }
    }

}

export default Dashboard;