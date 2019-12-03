import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div>
                <div className="blank-div">

                </div>
                <div className="text-center footer fixed-bottom ">
                    <div className="row">
                        <div className="col-5">
                            <p>Copyright &copy; 2019 Saturn</p> 
                            <p className="text-primary">Created by team no-babies</p>
                        </div>
                        
                        <div className="col-5 text-right footer-icons">
                            <img src="images/react.png" className="footer-icon" alt="React" />
                            <img src="images/bootstrap.png" className="footer-icon" alt="Bootstrap" />
                            <img src="images/firebase.png" className="footer-icon" alt="Firebase" />
                        </div>

                    </div>
                </div>
            </div>
        )

    }

}

export default Footer;