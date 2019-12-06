import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';

class ExternalProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            profilePic: '',
            loading: true,
            redirect: false,
        }
    }

    componentDidMount = () => {
        let storageRef = firebase.storage().ref();

        db.collection('users').doc(this.props.data).get().then(doc => {
            this.setState({ userData: doc.data() });
        })
        .then(_ =>{
            storageRef.child('profile-pic/' + this.state.userData.profile_picture).getDownloadURL().then((url) => {
                this.setState({ profilePic: url})
            });
        })
        .then(_ => {
            this.setState({ loading: false })
        })
        .catch(_ => {
            this.setState({ redirect: true })
        })
    }


    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/404' />
        } else if (this.state.loading === false) {
            return (
            <div>
                <div className="container">
                    <div className="row profile-padding">
                        <div className="col-2 text-center profile-picture-holder">
                            <img src={this.state.profilePic} className="profile-profile-picture" alt="Profile Pic" />
                            <p>{this.state.userData.custom_name}</p>
    
                        </div>
                        <div className="col">
                            <div className="jumbotron profile-holder">
                                <h3>{this.state.userData.custom_name}</h3>
                                
                                <hr />
    
                                <p>{this.state.userData.bio}</p>
    
                                <hr />
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            return null;
        }
    }

}

export default ExternalProfile;