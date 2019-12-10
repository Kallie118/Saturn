import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';

class Forum extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            loggedIn: null,
            loading: true,
            user: {},
            profilePic: null,
            userData: {},
            forumData: {},
            notExist: false,

            forumData: {},
            backgroundPic: '',
            logoPic: '',
            comments: [],
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
        })
    }

    updateUserData = () => {
        let storageRef = firebase.storage().ref();

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
            })
            .then(_ => {
                db.collection('forums').doc(this.props.match.params.forumName).get().then(doc => {
                    if (doc.exists) {
                        this.setState({ forumData: doc.data() });
                        this.setState({ notExist: false })
                    } else {
                        this.setState({ notExist: true })
                    }
                })
                .then(_ => {
                    if (this.state.forumData.background === 'forums/default-background.jpg') {
                        storageRef.child(this.state.forumData.background).getDownloadURL().then((url) => {
                            this.setState({ backgroundPic: url})
                        }).catch((error) => {
                            alert(error.message);
                        });
                    } else {
                        storageRef.child('forums/'+ this.props.match.params.forumName + '/backgrounds/' + this.state.forumData.background).getDownloadURL().then((url) => {
                            this.setState({ backgroundPic: url})
                        }).catch((error) => {
                            alert(error.message);
                        });
                    }
                })
                .then(_ => {
                    storageRef.child('forums/'+ this.props.match.params.forumName + '/logos/' + this.state.forumData.logo).getDownloadURL().then((url) => {
                        this.setState({ logoPic: url})
                    }).catch((error) => {
                        alert(error.message);
                    });
                })
                .then(_ => {
                    db.collection('forums').doc(this.props.match.params.forumName).collection('comments').get().then(data => {
                        this.setState({ comments: data.docs });
                        console.log(data.docs);
                    })
                })

            }).then(_ => {
                this.setState({ loading: false })
            })
            .catch(error => {
                alert(error.message);
            })
    }



    render() {
        const COMMENTS = this.state.comments.map((data, index) => {
            return (
                <div className="jumbotron forum-post" key={index} >
                    <div className="row">
                        <div className="col">
                            <h4>{data._document.proto.fields.title.stringValue}</h4>
                        </div>
                        <div className="col text-right">
                            <a href={'../profile/'+ data._document.proto.fields.username.stringValue} >{data._document.proto.fields.username.stringValue}</a>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col">
                            <textarea class="form-control forum-post-content" rows="10" disabled value={data._document.proto.fields.post.stringValue}></textarea>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        
                        <img src="../images/up-vote.png" className="forum-like-button" /> 
                        {data._document.proto.fields.likes.integerValue}
                        <img src="../images/down-vote.png" className="forum-like-button" />
                    </div>
                </div>
            )
        })
       


        const forumBackground = {
            backgroundImage: "url(" + this.state.backgroundPic + ")"
        }

        if (this.state.notExist) {
            return <Redirect to='/404' />
        } else if (this.state.loading) {
            return null
        } else if (this.state.loggedIn) {
            return (

                // Your code goes below this
                <div>

                    <nav class="navbar navbar-expand-md forum-navbar">
                       <img src={this.state.logoPic} height="100px" />
                        <div className="row forum-title-holder">
                            <div className="col">
                                <h3>{this.state.forumData.title}</h3>
                                <p className="text-primary">{this.state.forumData.slogan}</p>
                            </div>
                         </div>
                    </nav>


                    <div>
                        <div className="container">
                            <div className="jumbotron forum-list-title">
                                <div className="float-left">
                                    <button type="button" class="btn btn-primary">Create a new post</button>
                                    <button type="button" class="btn btn-primary">Follow this forum</button>
                                </div>
                            </div>

            

                            {COMMENTS}
                        </div>
                    <div class="forum-background-image-holder" style={forumBackground}></div>
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

export default Forum;