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
            popularData: [],
            user: {},
            userData: {},
            reload: false,
            findForum: false,
            createForum: false,
        }
    }

    componentDidMount = () => {
        if (this.props.location.state && this.props.location.state.from === 'register') {
            this.setState({ reload: true })

        } else {
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

            //get popular data
            db.collection('popular').get().then(data => {
                this.setState({ popularData: data.docs });
            });
        }
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

    hidePopup = () => {
        db.collection("users").doc(this.state.user.displayName).update({
            new_user: false
        }).then(() => {
            this.updateUserData();
        })
        .catch((error) => {
            alert(error)
        });
    }

    handleFindForum = () => {
        this.setState({ findForum: !this.state.findForum });
    }

    handleCreateForum = () => {
        this.setState({ createForum: true });
    }



    render() {
        if (this.state.reload) {
            window.location.reload();
            return (
                <Redirect to='/' />
            )

        }

        const POPULAR_DATA = this.state.popularData.map((data, index) => {
            return (
                <a key={index} className="list-group-item list-group-item-action">
                    <a href={'forum/' + data.id} >{data.id}</a>
                </a>
            )
        })

        const NEW_USER_POPUP = () => {

            if (this.state.createForum) {
                return <Redirect to='/myforums' />
            } else if (this.state.userData.new_user) {
                if (this.state.findForum) {
                    return (<div className="popup-holder">
                    <div className="jumbotron dashboard-newuser-popup text-center">
                        <h3>Welcome to Saturn!</h3>
                      
                        <hr />
                        <div className="list-group mobile-card div-center">
                                <a className="list-group-item list-group-item-action text-center disabled">
                                    <b>Popular Forums:</b>
                                </a>
                                {POPULAR_DATA}
                            </div>

                            <button className="btn btn-link" onClick={ this.handleFindForum }>Nevermind.</button>
                    </div>
                </div>
                )
                }
                return (<div className="popup-holder">
                    <div className="jumbotron dashboard-newuser-popup text-center">
                        <h3>Welcome to Saturn!</h3>
                      
                        <hr />
                        <div className="row">
                            <div className="col dashboard-newuser-popup-selection" onClick={this.handleCreateForum}>
                                <img src="images/create-forum.png" height="100px" alt="Create Forum" />
                                <h5>Create a forum!</h5>
                                <hr />

                                <p>&nbsp; Create and lead your own custom forum! Invite your friends and grow your own community. </p>
                            </div>

                            <div className="col dashboard-newuser-popup-selection" onClick={this.handleFindForum}>
                            <img src="images/join-forum.png" height="100px" alt="Join Forum" />
                                <h5>Find a forum!</h5>
                                <hr />

                                <p>Explore all the forums Saturn has to offer. Check out the forums we have recommended for you!</p>
                            </div>
                        </div>

                        <button className="btn btn-link" onClick={ this.hidePopup }>Don't show me this.</button>

                    </div>
                </div>
                )
            }
        }

        if (this.state.loading === true) {
            return null
        } else if (this.state.loggedIn === true) {
            return (
                <div>
                    {NEW_USER_POPUP()}


                    <div className="row">
                        <div className="col dashboard-mainboard">

                        <div className="jumbotron forum-post"  >
                            <div className="row">
                                <div className="col">
                                    <h4>What is the deal with airplane food</h4>
                                </div>
                                <div className="col text-right">
                                    <a href={'../profile/Caleb'} >Caleb</a>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col">
                                    <textarea class="form-control forum-post-content" rows="10" disabled value='that is fire'></textarea>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                
                                <img src="../images/up-vote.png" className="forum-like-button" /> 
                                10
                                <img src="../images/down-vote.png" className="forum-like-button" />
                            </div>
                        </div>

                        <div className="jumbotron forum-post"  >
                            <div className="row">
                                <div className="col">
                                    <h4>test</h4>
                                </div>
                                <div className="col text-right">
                                    <a href={'../profile/Caleb'} >GarretH</a>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col">
                                    <textarea class="form-control forum-post-content" rows="10" disabled value='test 123 test test'></textarea>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                
                                <img src="../images/up-vote.png" className="forum-like-button" /> 
                                3
                                <img src="../images/down-vote.png" className="forum-like-button" />
                            </div>
                        </div>

                        <div className="jumbotron forum-post"  >
                            <div className="row">
                                <div className="col">
                                    <h4>This is the start</h4>
                                </div>
                                <div className="col text-right">
                                    <a href={'../profile/Caleb'} >DomDotCom</a>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col">
                                    <textarea class="form-control forum-post-content" rows="10" disabled value='The start of something new'></textarea>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                
                                <img src="../images/up-vote.png" className="forum-like-button" /> 
                                0
                                <img src="../images/down-vote.png" className="forum-like-button" />
                            </div>
                        </div>

                        <div className="jumbotron forum-post"  >
                            <div className="row">
                                <div className="col">
                                    <h4>ABC123</h4>
                                </div>
                                <div className="col text-right">
                                    <a href={'../profile/Caleb'} >newaccount12</a>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col">
                                    <textarea class="form-control forum-post-content" rows="10" disabled value='We are testing somethign new'></textarea>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                
                                <img src="../images/up-vote.png" className="forum-like-button" /> 
                                4
                                <img src="../images/down-vote.png" className="forum-like-button" />
                            </div>
                        </div>
                        </div>


                        <div className="col-3 dashboard-right-sidebar-spacer">

                        </div>
                        <div className="col-sm dashboard-right-sidebar">
                            <div className="list-group mobile-card div-center">
                                <a className="list-group-item list-group-item-action text-center disabled">
                                    <b>Popular Forums:</b>
                                </a>
                                {POPULAR_DATA}
                            </div>
                            <br />
                            <div className="list-group mobile-card div-center">
                                <a className="list-group-item list-group-item-action text-center disabled">
                                    <b>Forums you follow:</b>
                                </a>
                                <a className="list-group-item list-group-item-action">
                                    Money Insider
                                </a>
                                <a className="list-group-item list-group-item-action">
                                    Fake news
                                </a>
                                <a className="list-group-item list-group-item-action">
                                    Home Imporovement
                                </a>
                                <a className="list-group-item list-group-item-action">
                                    Memes
                                </a>
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else if (this.state.loggedIn === false) {
            return <Redirect to='/' />

        } else {
            return null;
        }
    }

}

export default Dashboard;