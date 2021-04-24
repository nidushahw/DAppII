import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    handleLogin = async (userType) => {
        const response = await fetch(`http://localhost:8080/api/user/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                userType: userType
            }),
        });
        const token = await response.text();
        if (response.ok) {
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('token', token);
            localStorage.setItem('userType', userType);
            this.props.onLogin(true);
            this.props.history.push("/");
        } else {
            alert(`Error : ${token}`);
        }

    }

    handleLoginAsUser = async (event) => {
        console.log("Login as user clicked");
        event.preventDefault();
        this.handleLogin('USER');
    }

    handleLoginAsPartner = async (event) => {
        console.log("Login as partner clicked");
        event.preventDefault();
        this.handleLogin('PARTNER');
    }

    handleSignUpLink = (event) => {
        console.log("Register clicked");
        this.props.history.push("/Signup");
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Earn Health Coins</h1>
                    <p>
                        Log your healthy life style and get rewarded in Health Coins
                    </p>
                </Jumbotron>
                <Form>
                    <Form.Group as={Col} md="4" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            onChange={this.handleEmailChange}
                            placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            onChange={this.handlePasswordChange}
                            placeholder="Password" />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="formBasicRegister">
                        <Button variant="info" onClick={this.handleLoginAsUser} type="submit"> I am a user</Button>
                        {' '}
                        <Button variant="info" onClick={this.handleLoginAsPartner} type="submit">I am a partner</Button>
                        <div>
                            <Button variant="link" onClick={this.handleSignUpLink}>
                                Don’t have an account?
                        </Button>
                        </div>

                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default login;