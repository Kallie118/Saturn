import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            email: '',
            password: '',
            cpassword: '',
            username: '',
            pause: null,
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
        });
    }


    handleRegister = () => {


        if (this.state.password !== this.state.cpassword) {
            this.setState({ error: 'Your passwords did not match' })
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            })
                .then(() => {
                    this.setState({ pause: false })
                })
                .then(() => {
                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
                    })
                })
                .then(() => {
                    firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        user.updateProfile({
                            photoURL: "images/default-profile.png",
                            displayName: this.state.username
                        })
                        .then(() => {
                            this.setState({ pause: false })
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                    }
                    });
                })
                .catch((error) => {
                    this.setState({ error: error.message });
                    console.log(error.code, error.message);
                });

            // db.collection("Users").add({
            //     Username: this.dUsername.current.value,
            //     Password: md5(this.dCPassword.current.value),
            //     Email: this.dEmail.current.value
            // })
            //     .then(function (docRef) {

            //         console.log("Document written with ID: ", docRef.id);
            //     })
            //     .catch(function (error) {
            //         alert('An error has occured. Please try again later.');
            //         console.error("Error adding document: ", error);
            //     });
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
        } else if (this.state.loggedIn === true & this.state.pause === false) {
            return <Redirect to="/dashboard" />
        } else {
            return null;
        }
    }

}

export default Register;