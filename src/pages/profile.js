import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';
import ExternalProfile from '../components/externalprofile'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            loading: true,
            profilePic: null,
            disabled: true,
            error: '',
            popupError: '',
            user: {},
            userData: {},
            username: '',
            email: '',
            bio: '',
            profileChange: false,
            password: '',
            selectedFile: null,
            confirm: false,

        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
                this.setState({ user: firebase.auth().currentUser });

                this.updateUserData();
                this.setState({ username: this.state.user.displayName })

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
                storageRef.child('profile-pic/' + this.state.userData.profile_picture).getDownloadURL().then((url) => {
                    this.setState({ profilePic: url })
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

    handleEdit = () => {
        this.setState({ disabled: !this.state.disabled })
    }

    emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    handlePublish = () => {
        if (this.state.username.length <= 1) {
            this.setState({ error: 'Your username must be atleast 2 characters..' });
        } else if (this.state.username.length > 15) {
            this.setState({ error: 'Your username can not be longer then 15 characters.' });
        } else if (!this.emailIsValid(this.state.email)) {
            this.setState({ error: 'You must enter a valid email' });
        } else if (this.state.username.match("^[A-Za-z0-9]+$") === null) {
            this.setState({ error: 'Your username can only contain letters and numbers.' });
        } else {
            this.setState({ confirm: true })
        }
    }

    handleConfirm = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.user.email, this.state.password)
            .then(() => {
                db.collection("users").doc(this.state.username).update({
                    email: this.state.email,
                    bio: this.state.bio,
                    custom_name: this.state.username,
                })
                    .then(() => {
                        firebase.auth().currentUser.updateEmail(this.state.email).then(() => {
                            console.log('email updated')
                        }).catch((error) => {
                            console.log(error)
                        });
                    })
                    .then(() => {
                        if (this.state.profileChange === true) {
                            let storageRef = firebase.storage().ref('profile-pic/' + this.uuidv4());
                            storageRef.put(this.state.selectedFile).then((snapshot) => {

                                db.collection("users").doc(this.state.user.displayName).update({
                                    profile_picture: snapshot.metadata.name
                                }).then(() => {
                                    window.location.reload(false)
                                    
                                })
                                    .catch((error) => {
                                        alert(error)
                                    });

                            })
                                .catch(error => {
                                    this.setState({ popupError: error.message })
                                })
                        } else {
                            window.location.reload(false)
                        }
                    })
                    .catch((error) => {
                        this.setState({ popupError: error.message })
                    })

            })
            .catch((error) => {
                this.setState({ popupError: error.message })
            })
    }


    redAlert() {
        if (this.state.error !== '') {
            return (
                <div className="alert alert-dismissible alert-danger">
                    <strong>Oh snap!</strong> {this.state.error}
                </div>
            )
        } else {
            return (
                <p></p>
            )
        }
    }

    popupAlert() {
        if (this.state.popupError !== '') {
            return (
                <div className="alert alert-dismissible alert-danger">
                    <strong>Oh snap!</strong> {this.state.popupError}
                </div>
            )
        } else {
            return (
                <p></p>
            )
        }
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    handleBio = (event) => {
        this.setState({ bio: event.target.value })
    }

    handleProfilePicture = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
        this.setState({ profileChange: true })

    }


    render() {
        const CONFIRM_PASSWORD_POPUP = () => {

            if (this.state.confirm === true) {
                return (
                    <div className="popup-holder">
                        <div className="jumbotron profile-password-confirm-popup">
                            <h3>Confirm your password!</h3>
                            {this.popupAlert()}
                            <hr />

                            <label className="col-form-label" htmlFor="email">Password</label>
                            <input type="password" onChange={this.handlePassword} className="form-control" placeholder='' value={this.state.password} id="email" />

                            <hr />
                            <button className="btn btn-primary float-right" onClick={this.handleConfirm}>Confirm</button>

                        </div>
                    </div>
                )
            }
        }

        const PROFILE_BUTTON = () => {
            if (this.state.disabled) {
                return (
                    <button type="button" onClick={this.handleEdit} className="btn btn-secondary float-right">Edit</button>
                )
            } else {
                return (
                    <button type="button" onClick={this.handlePublish} className="btn btn-primary float-right">Publish</button>
                )
            }
        }




        if (this.state.loading === true) {
            return null
        } else if (this.props.match.params.externalProfile) {
            return <ExternalProfile data={this.props.match.params.externalProfile} />

        } else if (this.state.loggedIn === true) {
            return (
                // Your code goes below this
                <div>
                    {CONFIRM_PASSWORD_POPUP()}
                    <div className="container">
                        <div className="row profile-padding">
                            <div className="col-2 text-center profile-picture-holder">
                                <img src={this.state.profilePic} className="profile-profile-picture" alt="Profile Pic" />
                                <p>{this.state.user.displayName}</p>


                            </div>
                            <div className="col">
                                <div className="jumbotron profile-holder">
                                    <h3>Profile Info</h3>
                                    {this.redAlert()}
                                    <hr />

                                    <fieldset disabled={this.state.disabled}>
                                        <label className="col-form-label" htmlFor="email">Email</label>
                                        <input type="text" onChange={this.handleEmail} className="form-control" placeholder='' value={this.state.email} id="email" />
                                        <label className="col-form-label" htmlFor="username">Username</label>
                                        <input type="text" onChange={this.handleUsername} className="form-control" placeholder='' value={this.state.username} id="username" />
                                        <label className="col-form-label" htmlFor="bio">Biography</label>
                                        <textarea className="form-control" onChange={this.handleBio} placeholder='' value={this.state.bio} id="bio" rows="8"></textarea>
                                        <label className="col-form-label" htmlFor="profile-pic">Profile Pic</label> <br />
                                        <input type="file" name="file" className="form-control-file" accept="image/*" aria-describedby="fileHelp" id="profile-pic" onChange={this.handleProfilePicture} />
                                        <small id="fileHelp" class="form-text text-muted">Profile pictures are subject to deletion if found to contain nudity.</small>
                                    </fieldset>
                                    <hr />
                                    {PROFILE_BUTTON()}

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