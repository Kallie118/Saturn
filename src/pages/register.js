import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';
const storage = firebase.storage();

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            email: '',
            password: '',
            cpassword: '',
            username: '',
            proceed: null,
            loggedIn: null,
        }
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }


    handleRegister = () => {


        if (this.state.password !== this.state.cpassword) {
            this.setState({ error: 'Your passwords did not match.' });
        } else if (this.state.username.length > 15) {
            this.setState({ error: 'Your username can not be longer then 15 characters.' });
        } else if (this.state.username.length <= 0) {
            this.setState({ error: 'Username is required.' });
        } else if (this.state.email.length <= 0) {
            this.setState({ error: 'Email is required.' });
        } else if (this.state.password.length <= 0) {
            this.setState({ error: 'Password is required' });
        } else if (this.state.cpassword.length <= 0) {
            this.setState({ error: 'Confirm password is required.' });
        } else if (this.state.username.match("^[A-Za-z0-9]+$") === null) {
            this.setState({ error: 'Your username can only contain letters and numbers.' });
        } else {
            db.collection('users').doc(this.state.username).get()
            .then((doc) => {
                if (doc.exists) {
                    this.setState({ error: 'Sorry this username has already been taken.'});
                } else {
                    this.setState({ proceed: false });
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            })
                .then(() => {
                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
                    })
                })
                .then(() => {
                    //Update user info in database
                    db.collection("users").doc(this.state.username).set({
                        new_user: true,
                        email: this.state.email,
                        forums: 0,
                        profile_picture: 'default-profile.png',
                        bio: 'This is a default bio.',
                        custom_name: this.state.username
                    })
                        .then((docRef) => {
                            //Assuming it was written to database we will begin to start.
                            firebase.auth().onAuthStateChanged((user) => {
                                if (user) {
                                    user.updateProfile({
                                        photoURL: "images/default-profile.png",
                                        displayName: this.state.username
                                    })
                                    .then(() => {
                                        this.setState({ proceed: true })
                                    })
                                    .catch((error) => {
                                        this.setState({ error: error })
                                    });
                                }
                                });
                        })
                        .catch(function (error) {
                            alert('An error has occured. Please try again later.');
                            console.error("Error adding document: ", error);
                        });

                })
                .catch((error) => {
                    this.setState({ error: error.message });
                    console.log(error.code, error.message);
                });
                    
                }
            });
            
        }


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

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleCPassword = (event) => {
        this.setState({ cpassword: event.target.value })
    }
    handleUsername = (event) => {
        this.setState({ username: event.target.value })
    }


    render() {
        if (this.state.loggedIn === false) {
            return (
                <div>

                    <div className="col-sm">
                        <br />  <br />
                        <div className="container">
                            <div className="jumbotron">
                                <h1>Make a new account. </h1>

                                {this.redAlert()}
                                <label className="col-form-label" htmlFor="username">Username</label>
                                <input type="text" onChange={this.handleUsername} className="form-control" value={this.state.username} placeholder="CoolGuy25" id="username" />
                                <label className="col-form-label" htmlFor="email">Email</label>
                                <input type="text" onChange={this.handleEmail} className="form-control" placeholder="JohnDoe@gmail.com" id="email" />
                                <label className="col-form-label" htmlFor="pass">Password</label>
                                <input type="password" onChange={this.handlePassword} className="form-control" placeholder="Password" id="pass" />
                                <label className="col-form-label" htmlFor="cpass">Confirm Password</label>
                                <input type="password" onChange={this.handleCPassword} className="form-control" placeholder="Confirm Password" id="cpass" /> <br />
                                <button type="button" className="btn btn-primary" onClick={() => { this.handleRegister() }}>Next</button> <br />

                            </div>
                        </div>

                    </div>
                </div>
            )
        } else if (this.state.loggedIn === true && this.state.proceed === true) {
            return <Redirect to={{
                pathname: '/dashboard',
                state: { from: 'register' }
            }} />
        } else if (this.state.loggedIn === true && this.state.proceed === null) {
            return <Redirect to='/dashboard' />
        
        } else {
            return null;
        }
    }

}

export default Register;