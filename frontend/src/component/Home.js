import React from "react";
import PartnerHome from './PartnerHome';
import UserHome from './UserHome';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: ''
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const userType = localStorage.getItem('userType');
        if (!token || !email || !userType) {
            this.props.history.push("/Login");
        } else {
            this.setState({ userType: userType })
        }
    }

    render() {
        return (
            <div>
                {this.state.userType === 'PARTNER' ? <PartnerHome /> : <UserHome />}
            </div>
        );
    }
}

export default Home;