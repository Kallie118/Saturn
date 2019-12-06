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
                <div className="text-center footer">
                    <div className="row">
                        <div className="col-5">
                            <p>Copyright &copy; 2019 Saturn</p> 
                            <p className="text-primary">Created by team no-babies</p>
                        </div>

                        <div className="col-5 text-right footer-icons">
                            <img src="https://firebasestorage.googleapis.com/v0/b/saturn-d573e.appspot.com/o/static-images%2Freact.png?alt=media&token=eabf66ac-18c3-49cb-9e5f-4936db26bbf1" className="footer-icon" alt="React" />
                            <img src="https://firebasestorage.googleapis.com/v0/b/saturn-d573e.appspot.com/o/static-images%2Fbootstrap.png?alt=media&token=7156b4ab-b404-4933-8fbd-54f9c0dc4695" className="footer-icon" alt="Bootstrap" />
                            <img src="https://firebasestorage.googleapis.com/v0/b/saturn-d573e.appspot.com/o/static-images%2Ffirebase.png?alt=media&token=101a52af-96d5-4527-8cd0-745f8f5e87c3" className="footer-icon" alt="Firebase" />
                        </div>

                    </div>
                </div>
            </div>
        )

    }

}

export default Footer;