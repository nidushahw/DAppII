import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            walletAddress: ''
        }
    }

    handleLoginLink = (event) => {
        console.log("Login clicked");
        this.props.history.push("/Login");
    }

    handleRegister = async (userType) => {
        console.log("Register clicked");
        const response = await fetch(`http://localhost:8080/api/user/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                walletAddress: this.state.walletAddress,
                userType: userType
            }),
        });
        const token = await response.text();
        if (response.ok) {
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('token', token);
            localStorage.setItem('userType', userType);
            this.props.history.push("/");
        } else {
            alert(`Error : ${token}`);
        }
    }

    handleRegisterAsPartner = async (event) => {
        console.log("Register as partner clicked");
        event.preventDefault();
        this.handleRegister('PARTNER');
    }

    handleRegisterAsUser = async (event) => {
        console.log("Register as user clicked");
        event.preventDefault();
        this.handleRegister('USER');
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleAddressChange = (event) => {
        this.setState({ walletAddress: event.target.value });
    }

    render() {
        return (<div>
            <Jumbotron>
                <h1>Earn Health Coins</h1>
                <p>
                    Log your healthy life style and get rewarded in Health Coins
                </p>
            </Jumbotron>
            <Form>

                <Form.Group as={Col} md="4" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicWallet">
                    <Form.Label>Wallet Address</Form.Label>
                    <Form.Control type="text" placeholder="Wallet Address" onChange={this.handleAddressChange} />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicRegister">
                    <Button variant="info" onClick={this.handleRegisterAsUser}>
                        Register
                        </Button>{" "}
                    <Button variant="info" onClick={this.handleRegisterAsPartner}>
                        Register As Partner
                        </Button>
                </Form.Group>
                <Button variant="link" onClick={this.handleLoginLink}>
                    Already have an account?
                    </Button>
            </Form>
        </div>
        );
    }
}

export default SignUp;