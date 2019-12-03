import React from 'react';

class NewPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active">New Post</li>

                </ol>

                <div className="col-sm text-center">
                    <br />  <br />
                    <div className="container">
                        <div className="jumbotron">
                            <h1>Make a new post </h1>
                            <form method="post" action="http://localhost:5000/postdata">
                                <input type="text" className="form-control" placeholder="Your name here" name="myname" />
                                <br />
                                <input type="text" className="form-control" placeholder="Your message here" name="mypost" />
                                <br />
                                <input type="submit" className="btn btn-primary" value="Post it" />
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        )

    }

}

export default NewPost;