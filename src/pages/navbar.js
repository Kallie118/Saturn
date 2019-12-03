import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Register from './register';
import Home from './home';
import Dashboard from './dashboard.js';
import firebase from 'firebase';


class Navbar extends React.Component {

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

    handleLogout = () => {
        firebase.auth().signOut().then(function() {
            console.log('logged out')
          }).catch(function(error) {
            console.log(error)
          });
    }

    render() {
        let user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
        }

        if (this.state.loggedIn === true) {
            return (
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/"><img src="images/logo.png" alt="Brand Logo" height="40px" /> <b>Saturn</b></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor03">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                </li>

                                <li class="nav-item dropdown show">
                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" >{email}</a>
                                    <div class="dropdown-menu " x-placement="bottom-start">
                                        <a class="dropdown-item" href="#">Profile</a>
                                        <a class="dropdown-item" onClick={() => { this.handleLogout() }}>Logout</a>
                                    </div>
                                </li>
                            </ul>
                                
                       
                        </div>

                        
                    </nav>

                        {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/register" component={Register} />
                            <Route path="/" component={Home} />
                        </Switch>
                </Router>
                    )
        
        } else if (this.state.loggedIn === false) {
            return (
                <Router>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="/"><img src="images/logo.png" alt="Brand Logo" height="40px" /> <b>Saturn</b></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarColor03">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link">Register</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/register" component={Register} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </Router>
                    )
        } else {
            return null;
                }
            }
        
        }
export default Navbar