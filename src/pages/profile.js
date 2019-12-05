import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';

class Profile extends React.Component {
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

                this.updateUserData();

            } else {
                this.setState({ loggedIn: false });
                this.setState({ loading: false })
            }
        });
    }

    updateUserData = () => {
        db.collection('users').doc(this.state.user.displayName).get().then(doc => {
            if (doc.exists) {
                this.setState({ userData: doc.data() });
                this.setState({ loading: false })
            } else {
                alert('Error getting user data please reload.')
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
                    <div className="container">
                        <div className="row profile-padding">
                            <div className="col-2 text-center profile-picture-holder">
                                <img src={this.state.user.photoURL} className="profile-profile-picture" alt="Profile Pic" />
                                <p>{this.state.user.displayName}</p>
                            </div>
                            <div className="col">
                                <div className="jumbotron profile-holder">
                                    test
                                </div>
                            </div>
                        </div>
                    </div>
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

export default Profile;