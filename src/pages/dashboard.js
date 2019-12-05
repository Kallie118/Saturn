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

                    db.collection('users').doc(user.displayName).get().then(doc => {
                        if (doc.exists) {
                            this.setState({ userData: doc.data() });
                            this.setState({ loading: false })
                        } else {
                            console.log('Document does not exist.');
                        }
                    });

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
                    {data.id}
                </a>
            )
        })


        if (this.state.loading === true) {
            return null
        } else if (this.state.loggedIn === true) {
            return (
                <div>


                    <div className="popup-holder">
                        <div className="jumbotron dashboard-newuser-popup">
                            test <br /> <br /> <br /> test
                                </div>

                    </div>

                    <div className="row">
                        <div className="col dashboard-mainboard">


                            <div className="jumbotron div-center">
                                test <br /> <br /> <br /> test
                           </div>
                            <div className="jumbotron div-center">
                                test <br /> <br /> <br /> test
                           </div>
                            <div className="jumbotron div-center">
                                test <br /> <br /> <br /> test
                           </div>
                            <div className="jumbotron div-center">
                                test <br /> <br /> <br /> test
                           </div>
                            <div className="jumbotron div-center">
                                test <br /> <br /> <br /> test
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