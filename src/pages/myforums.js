import React from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom'
import db from '../config/firebase';

class MyForums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            loading: true,
            user: {},
            userData: {},
            error: '',

            shortName: '',
            forumTitle: '',
            forumSlogan: '',

            forumLogo: null,
            forumBackground: null,

            backgroundChange: false,
            logoChange: false,
            backgroundUrl: '',
            logoUrl: '',

            ownedForums: [],
            editForum: false,

            canEdit: false,
            forumData: {},
            stopGet: false,
            stopGet2: false,

            oldLogoUrl: '',
            oldBackgroundUrl: '',


        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
                this.setState({ user: firebase.auth().currentUser });

                this.updateUserData();
                this.getUserForums();
                

            } else {
                this.setState({ loggedIn: false });
                this.setState({ loading: false })
            }
        })
            

        
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

    handleShortName = (event) => {
        this.setState({ shortName: event.target.value })
    }

    handleForumTitle = (event) => {
        this.setState({ forumTitle: event.target.value })
    }

    handleForumSlogan = (event) => {
        this.setState({ forumSlogan: event.target.value })
    }

    handleForumLogo = (event) => {
        this.setState({ forumLogo: event.target.files[0] })
        this.setState({ logoChange: true })
    }

    handleForumBackground = (event) => {
        this.setState({ forumBackground: event.target.files[0] })
        this.setState({ backgroundChange: true })
    }

    handleEditForum = (forum) => {
        this.setState({ editForum: forum})
    }

    closeEditPopup = () => {
        this.setState({ editForum: false})
    }

    redAlert() {
        if (this.state.error !== '') {
            return (
                <div className="alert alert-dismissible alert-danger">
                    <strong>Oh snap!</strong> {this.state.error}
                </div>
            )
        } else {
            return null;
        }
    }


    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    createForum = () => {
        if (this.state.shortName === '') {
            this.setState({ error: 'Short name is required.' })
        } else if (this.state.forumTitle.length === '') {
            this.setState({ error: 'Forum title is required.' })
        } else if (this.state.forumSlogan === '') {
            this.setState({ error: 'Forum slogan is required.' })
        } else if (this.state.shortName.length < 2) {
            this.setState({ error: 'Short name must be atleast 3 characters.' })
        } else if (this.state.shortName.length > 25) {
            this.setState({ error: 'Short name can not be more then 25 characters.' })
        } else if (this.state.shortName.match("^[A-Za-z0-9]+$") === null) {
            this.setState({ error: 'Short name can only contain letters and numbers.' });
        } else if (this.state.forumTitle.length < 3) {
            this.setState({ error: 'Forum title must be atleast 3 characters.' });
        } else if (this.state.forumTitle.length > 40) {
            this.setState({ error: 'Forum title can not be more then 40 characters.' });
        } else if (this.state.forumSlogan.length < 3) {
            this.setState({ error: 'Forum slogan must be atleast 3 characters.' });
        } else if (this.state.forumSlogan.length > 80) {
            this.setState({ error: 'Forum slogan can not be more then 80 characters.' });
        } else {
            db.collection('forums').doc(this.state.shortName).get()
                .then((doc) => {
                    if (doc.exists) {
                        this.setState({ error: 'Sorry this shortname has already been taken.' });
                    } else {
                        db.collection("forums").doc(this.state.shortName).set({
                            shortName: this.state.shortName,
                            title: this.state.forumTitle,
                            slogan: this.state.forumSlogan,
                            logo: '',
                            background: '',
                            owner: this.state.userData.custom_name,
                        })
                            .then(_ => {
                                if (this.state.backgroundChange) {
                                    let file = this.state.forumBackground;
                                    let storageRef = firebase.storage().ref('forums/' + this.state.shortName + '/backgrounds/' + this.uuidv4());
                                    storageRef.put(file).then((snapshot) => {

                                        db.collection("forums").doc(this.state.shortName).update({
                                            background: snapshot.metadata.name
                                        });
                                    })
                                        .catch((error) => {
                                            console.log(error)
                                        });
                                } else {
                                    db.collection("forums").doc(this.state.shortName).update({
                                        background: 'forums/default-background.jpg'
                                    });
                                }

                            })
                            .then(_ => {
                                if (this.state.logoChange) {
                                    let file = this.state.forumLogo;
                                    let storageRef = firebase.storage().ref('forums/' + this.state.shortName + '/logos/' + this.uuidv4());
                                    storageRef.put(file).then((snapshot) => {

                                        db.collection("forums").doc(this.state.shortName).update({
                                            logo: snapshot.metadata.name
                                        });
                                    })
                                        .catch((error) => {
                                            console.log(error)
                                        });
                                } else {
                                    db.collection("forums").doc(this.state.shortName).update({
                                        logo: 'forums/default-logo.png'
                                    });
                                }
                            })
                            .then(_ => {

                                db.collection("users").doc(this.state.userData.custom_name).update({
                                    forums: (this.state.userData.forums + 1),
                                })
                                    .then(_ => {
                                        db.collection("users").doc(this.state.userData.custom_name).collection("owned_forums").doc(this.state.shortName).set({
                                            owned: 'yes'
                                        })
                                    })
                                    .then(_ => {
                                        this.updateUserData();
                                    })
                                    .catch((error) => {
                                        console.log(error.message);
                                    })
                            })
                            .then(_ => {
                                this.updateUserData();
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                })
        }
    }

    editForum = () => {

        if (this.state.forumTitle.length === '') {
            this.setState({ error: 'Forum title is required.' })
        } else if (this.state.forumSlogan === '') {
            this.setState({ error: 'Forum slogan is required.' })
        } else if (this.state.forumTitle.length < 3) {
            this.setState({ error: 'Forum title must be atleast 3 characters.' });
        } else if (this.state.forumTitle.length > 40) {
            this.setState({ error: 'Forum title can not be more then 40 characters.' });
        } else if (this.state.forumSlogan.length < 3) {
            this.setState({ error: 'Forum slogan must be atleast 3 characters.' });
        } else if (this.state.forumSlogan.length > 80) {
            this.setState({ error: 'Forum slogan can not be more then 80 characters.' });
        } else {
                db.collection("forums").doc(this.state.shortName).update({
                    title: this.state.forumTitle,
                    slogan: this.state.forumSlogan,
                })
                    .then(_ => {
                        if (this.state.backgroundChange) {
                            let file = this.state.forumBackground;
                            let storageRef = firebase.storage().ref('forums/' + this.state.shortName + '/backgrounds/' + this.uuidv4());
                            storageRef.put(file).then((snapshot) => {

                                db.collection("forums").doc(this.state.shortName).update({
                                    background: snapshot.metadata.name
                                });
                            })
                                .catch((error) => {
                                    console.log(error)
                                });
                        } else {
                            db.collection("forums").doc(this.state.shortName).update({
                                background: this.state.oldBackgroundUrl
                            });
                        }

                    })
                    .then(_ => {
                        if (this.state.logoChange) {
                            let file = this.state.forumLogo;
                            let storageRef = firebase.storage().ref('forums/' + this.state.shortName + '/logos/' + this.uuidv4());
                            storageRef.put(file).then((snapshot) => {

                                db.collection("forums").doc(this.state.shortName).update({
                                    logo: snapshot.metadata.name
                                });
                            })
                                .catch((error) => {
                                    console.log(error)
                                });
                        } else {
                            db.collection("forums").doc(this.state.shortName).update({
                                logo: this.state.oldLogoUrl
                            });
                        }
                    })
                    .then(_ => {
                        this.setState({ editForum: false})
                        this.setState({ stopGet: false})
                        this.setState({ stopGet2: false})

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }


    checkUserForums = () => {
       if (!this.state.stopGet2) {
        db.collection('users').doc(this.state.user.displayName).collection('owned_forums').get().then(data => {
            this.setState({ ownedForums: data.docs });
           
        })
        .then(_ => {
            this.state.ownedForums.map((forumList, index) => {
             
                if (forumList.id === this.state.editForum) {
                    this.setState({ canEdit: true });
                } else {
                    this.setState({ canEdit: false });
                }
            })
        })
        .then(_ => {
            db.collection('forums').doc(this.state.editForum).get().then(doc => {
                
                this.setState({ forumData: doc.data() })
                this.setState({ forumTitle: doc.data().title})
                this.setState({ forumSlogan: doc.data().slogan})
                this.setState({ shortName: doc.data().shortName})
                this.setState({ oldBackgroundUrl: doc.data().background})
                this.setState({ oldLogoUrl: doc.data().logo})
            })
        })
        .then(_ => {
            this.setState({ stopGet2: true })
        })
        }
    }

    getUserForums = () => {
        if (!this.state.stopGet) {
            db.collection('users').doc(this.state.user.displayName).collection('owned_forums').get().then(data => {
                this.setState({ ownedForums: data.docs });
                this.setState({ stopGet: true });
            });
        }
    }

    editForumPopup = () => {
        if (this.state.editForum) {
            this.checkUserForums()
           
           if (this.state.canEdit === true) {

                return (
                    <div className="popup-holder">
                        <div className="jumbotron my-forums-forum-edit-popup">
                            <h3>{this.state.editForum}</h3>

                            <div>
                                    <label className="col-form-label" htmlFor="forum-title"><span className="text-danger">*</span>Forum Title</label>
                                    <small><p className="text-muted" htmlFor="forum-title">This title will be displayed on your forum, can contain spaces and up to 40 characters. </p></small>
                                    <input type="text" placeholder="Hot Rods & Memes" className="form-control" onChange={this.handleForumTitle} value={this.state.forumTitle} id="forum-title" />

                                    <br />

                                    <label className="col-form-label" htmlFor="forum-short-name"><span className="text-danger">*</span>Forum Slogan</label>
                                    <small><p className="text-muted" htmlFor="forum-short-name">This will display under your title, can be up to 80 characters.</p></small>
                                    <input type="text" className="form-control" onChange={this.handleForumSlogan} value={this.state.forumSlogan} placeholder="We have cars, we have memes, what more do you need?" id="forum-short-name" />

                                    <br />

                                    <label className="col-form-label" htmlFor="forum-logo"><span className="text-danger"></span>Forum Logo</label>
                                    <small><p className="text-muted" htmlFor="forum-logo">This is the logo it will display on the top left of your page.</p></small>
                                    <input type="file" name="forum-logo" className="form-control-file" onChange={this.handleForumLogo} accept="image/*" aria-describedby="fileHelp" id="forum-logo" />

                                    <br />

                                    <label className="col-form-label" htmlFor="forum-background"><span className="text-danger"></span>Forum Background</label>
                                    <small><p className="text-muted" htmlFor="forum-background">This if your forums background image</p></small>
                                    <input type="file" name="forum-background" className="form-control-file" accept="image/*" aria-describedby="fileHelp" id="forum-background" onChange={this.handleForumBackground} />

                                    <br />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-danger">* = required</p>
                                    </div>
                                    <div className="col text-right">
                                        
                                        <button className="btn btn-primary" onClick={this.editForum}>Edit</button>
                                        <button className="btn btn-secondary" onClick={this.closeEditPopup}>Cancel</button>
                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                )
            } else {
                return null;
            }
        }
    }

        render() {
            const FORUM_DATA = this.state.ownedForums.map((data, index) => {
                
                return (
                    <tr class="table-secondary" key={index}>
                        <td>{data.id}</td>
                        <td className="text-right"> 
                            <img src="images/config.png" onClick={() => {this.handleEditForum(data.id)}} className="my-forums-config-icon" height="20px" />     
                        </td>
                    </tr>
                )
            })

            const FORUM_MANAGER = () => {
                
                if (this.state.userData.forums === 0) {
                    
                    return (
                        <div>
                            <div className="col text-center">
                                <h5 >Create a forum.</h5>
                                {this.redAlert()}
                                <hr />
                            </div>

                            <div>
                                <label className="col-form-label" htmlFor="forum-short-name"><span className="text-danger">*</span>Forum Short Name</label>
                                <small><p className="text-muted" htmlFor="forum-short-name">This name cannot be changed, it can only contain letters and numbers. Maximum of 25 Characters.</p></small>
                                <input type="text" placeholder="CarMemes" className="form-control" onChange={this.handleShortName} value={this.state.shortName} id="forum-short-name" />

                                <br />

                                <label className="col-form-label" htmlFor="forum-title"><span className="text-danger">*</span>Forum Title</label>
                                <small><p className="text-muted" htmlFor="forum-title">This title will be displayed on your forum, can contain spaces and up to 40 characters. </p></small>
                                <input type="text" placeholder="Hot Rods & Memes" className="form-control" onChange={this.handleForumTitle} value={this.state.forumTitle} id="forum-title" />

                                <br />

                                <label className="col-form-label" htmlFor="forum-short-name"><span className="text-danger">*</span>Forum Slogan</label>
                                <small><p className="text-muted" htmlFor="forum-short-name">This will display under your title, can be up to 80 characters.</p></small>
                                <input type="text" className="form-control" onChange={this.handleForumSlogan} value={this.state.forumSlogan} placeholder="We have cars, we have memes, what more do you need?" id="forum-short-name" />

                                <br />

                                <label className="col-form-label" htmlFor="forum-logo"><span className="text-danger"></span>Forum Logo</label>
                                <small><p className="text-muted" htmlFor="forum-logo">This is the logo it will display on the top left of your page.</p></small>
                                <input type="file" name="forum-logo" className="form-control-file" onChange={this.handleForumLogo} accept="image/*" aria-describedby="fileHelp" id="forum-logo" />

                                <br />

                                <label className="col-form-label" htmlFor="forum-background"><span className="text-danger"></span>Forum Background</label>
                                <small><p className="text-muted" htmlFor="forum-background">This if your forums background image</p></small>
                                <input type="file" name="forum-background" className="form-control-file" accept="image/*" aria-describedby="fileHelp" id="forum-background" onChange={this.handleForumBackground} />

                                <br />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-primary" onClick={this.createForum}>Create Forum</button>
                                </div>
                                <div className="col text-right">
                                    <p className="text-danger">* = required</p>
                                </div>
                            </div>
                        </div>

                    )
                } else {

                    return (
                        <div>
                            {this.editForumPopup()}
                            <table class="table table-hover">
                                <tr class="table-info">
                                    <td>Name</td>
                                    <td className="text-right">Settings</td>
                                </tr>
                                {FORUM_DATA}
                            </table>
                        </div>
                    )
                }

            }

            if (this.state.loading === true) {
                return null
            } else if (this.state.loggedIn === true) {
                return (

                    // Your code goes below this
                    <div className="col">
                        <div className="container">
                            <div className="jumbotron my-forums-jumbotron">
                                <h3>Manage My Forums</h3>
                                <small><p className="text-primary">This page allows you to manage the forums you own!</p></small>
                                <hr />
                                {FORUM_MANAGER()}
                            </div>
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

    export default MyForums;