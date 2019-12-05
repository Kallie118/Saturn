import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            loggedIn: null,
        }
    }

    handleLogin = () => {
        console.log('handling login')
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            this.setState({ error: error.message });
            console.log(error.code, error.message);
        })
            .then((res) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.setState({ loggedIn: true })
                    } else {
                        this.setState({ loggedIn: false })
                    }
                });
            });
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


    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
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

    render() {
        if (this.state.loggedIn === true) {
            return (
                <Redirect to='/dashboard' />
            )
        } else if (this.state.loggedIn === false) {
            return (
                <div>
                    

                    <div className="row login">
                        <div className="col-md-7 login-splash">

                        </div>
                        <div className="col-md-4 login-holder">
                            <div class="card card-center text-white border-primary" >
                                <div class="card-header text-center">Login</div>
                                <div class="card-body">
                                    <div class="form-group">
                                        {this.redAlert()}
                                        <label class="col-form-label" for="inputDefault">Email</label>
                                        <input type="text" onChange={this.handleEmail} class="form-control" placeholder="Email" id="inputDefault" />
                                        <label class="col-form-label" for="inputDefault">Password</label>
                                        <input type="password" onChange={this.handlePassword} class="form-control" placeholder="Password" id="inputDefault" /> <br />
                                        <button type="button" class="btn btn-primary" onClick={() => { this.handleLogin() }}>Login</button> &nbsp;
                               </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <small>Don't have an account? <a href="/register"><b>Register</b></a></small>
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>There was an error</h1>
                </div>
            )
        }

    }

}

export default Home;