import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const footerStyle = {
            clear: 'both',
            float: 'none',
            size: '0.3vh'
        }

        return (
            <div>
                <div className="blank-div">

                </div>
                <div className="text-center footer fixed-bottom my-auto" style={footerStyle}>
                    <div className="row">
                        <div className="col my-auto">
                        <p><small>This is a demonstration of using a backend (express.js) to work with a front end(React.js)</small></p>
                        </div>
                        <div className="col my-auto">
                        <p><small>Copyright &copy; 2019 Caleb Hinton</small></p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default Footer;