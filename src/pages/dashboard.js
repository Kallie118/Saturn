import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';
import { REFUSED } from 'dns';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            popularData: [],
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });

        //get popular data
        db.collection('popular').get().then(data => {
            this.setState({ popularData: data.docs });
        });
    }



    render() {

        const POPULAR_DATA = this.state.popularData.map((data, index) => {
                    return (
                        <a href="#" key={index} className="list-group-item list-group-item-action">
                            {data.id}
                        </a>  
                    )
                })
        


        if (this.state.loggedIn === true) {
            return (
                <div>
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
                            <div class="list-group mobile-card div-center">
                                <a href="#" class="list-group-item list-group-item-action text-center disabled">
                                    <b>Popular Forums:</b>
                                </a>
                                {POPULAR_DATA}
                            </div>
                            <br />
                            <div class="list-group mobile-card div-center">
                                <a href="#" className="list-group-item list-group-item-action text-center disabled">
                                    <b>Forums you follow:</b>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    Money Insider
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    Fake news
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    Home Imporovement
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    Memes
                                </a>
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else if (this.state.loggedIn === false) {
            console.log('YOU WERENT LOGGED IN')
            return <Redirect to='/' />

        } else {
            return null;
        }
    }

}

export default Dashboard;