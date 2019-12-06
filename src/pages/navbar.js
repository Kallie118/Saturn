import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Register from './register';
import Home from './home';
import Dashboard from './dashboard';
import Profile from './profile';
import MyForums from './myforums';
import firebase from 'firebase';
import NotFound from '../pages/404';
import db from '../config/firebase';



class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            loading: true,
            userData: {},
            user: {},

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

    handleLogout = () => {
        firebase.auth().signOut().then(function () {
            console.log('logged out')
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {
        if (this.state.loading === true) {
            return null
        } else if (this.state.loggedIn === true) {
            return (
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                            <a className="navbar-brand" href="/"><img src="https://firebasestorage.googleapis.com/v0/b/saturn-d573e.appspot.com/o/static-images%2Flogo.png?alt=media&token=720bb0dd-5c9b-4443-b2a1-d2c24ed0671d" alt="Brand Logo" height="40px" /> <b>Saturn</b></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarColor03">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/myforums" className="nav-link">My forums</Link>
                                    </li>
                                </ul>

                                <ul className="navbar-nav ml-auto nav-profile-holder">
                                    <li className="nav-item dropdown show">
                                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
                                            <img src={this.state.profilePic} alt="Profile Image" className="nav-profile-picture"  /> {this.state.userData.custom_name}</a>
                                        <div className="dropdown-menu " x-placement="bottom-start">
                                            <Link to="/profile" className="dropdown-item">Profile</Link>
                                            <a className="dropdown-item" onClick={() => { this.handleLogout() }}>Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="nav-spacer">
                        </div>
                    </div>

                    {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/profile/:externalProfile" component={Profile} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/myforums" component={MyForums} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/register" component={Register} />
                        <Route path="/404" component={NotFound} />
                        <Route path="/" component={Home} />
                        <Route path="*" component={NotFound} />
                        
                    </Switch>
                </Router>
            )

        } else if (this.state.loggedIn === false) {
            return (
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
                        <div className="nav-spacer">
                        </div>
                    </div>

                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/profile" component={Profile} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/register" component={Register} />
                        <Route path="/404" component={NotFound} />
                        <Route path="/" component={Home} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Router>
            )
        } else {
            return null;
        }
    }

}
export default Navbar