import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            loading: true,
            user: {},
            profilePic: null,
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
                this.setState({ userData: doc.data() });
                this.setState({ bio: this.state.userData.bio })
                this.setState({ email: this.state.userData.email })
        })
        .then(_ => {
            let storageRef = firebase.storage().ref();
            storageRef.child('profile-pic/'+ this.state.userData.profile_picture).getDownloadURL().then((url) => {
                this.setState({ profilePic: url})
              }).catch((error) => {
                alert(error.message);
              });
        }).then(_ => {
            this.setState({ loading: false })
        })
        .catch(error => {
            alert(error.message);
        })
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