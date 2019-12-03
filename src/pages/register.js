import React from 'react';
import md5 from 'md5';
import firebase from 'firebase';
import db from '../config/firebase';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            email: '',
            password: '',
            cpassword: ''
        }
    }


    handleRegister = () => {


         if (this.state.password !== this.state.cpassword) {
            this.setState({ error: 'Your passwords did not match' })
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
                this.setState({ error: error.message });

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


    render() {


        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Register</li>

                </ol>

                <div className="col-sm">
                    <br />  <br />
                    <div className="container">
                        <div className="jumbotron">
                            <h1>Make a new account. </h1>

                            {this.redAlert()}
                            
                            <label className="col-form-label" htmlFor="email">Email</label>
                            <input type="text" onChange={this.handleEmail} className="form-control" placeholder="JohnDoe@gmail.com" id="email" />
                            <label className="col-form-label" htmlFor="pass">Password</label>
                            <input type="password" onChange={this.handlePassword} className="form-control" placeholder="Password" id="pass" />
                            <label className="col-form-label" htmlFor="cpass">Confirm Password</label>
                            <input type="password" onChange={this.handleCPassword} className="form-control" placeholder="Confirm Password" id="cpass" /> <br />
                            <button type="button" className="btn btn-primary" onClick={() => { this.handleRegister() }}>Register</button> <br />



                        </div>
                    </div>

                </div>
            </div>
        )

    }

}

export default Register;