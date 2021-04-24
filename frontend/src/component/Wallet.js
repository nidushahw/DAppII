import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import QRCode from 'qrcode.react';


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletAddress: '',
            coinBalance: 0
        }
    }

    componentDidMount = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/user/', {
            headers: {
                'auth-token': token
            }
        });
        if (response.ok) {
            const user = await response.json();
            this.setState({
                walletAddress: user.walletAddress,
                coinBalance: user.coinBalance
            });
        }
    }

    render() {
        return (
            <Container fluid="md">
                <Row>
                    <Col>
                        <CardColumns>
                            <Card border="info" style={{ textAlign: "center" }}>
                                <Card.Body>
                                    <Card.Title>Health Coin Balance : {this.state.coinBalance}</Card.Title>
                                    <QRCode value={this.state.walletAddress} />
                                </Card.Body>
                                <Card.Footer>
                                    <p className="text-muted">{this.state.walletAddress}</p>
                                </Card.Footer>
                            </Card>
                        </CardColumns>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                            Username
                        </Form.Label>
                        <InputGroup >
                            <InputGroup.Prepend>
                                <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="inlineFormInputGroup" type="number" min={0} placeholder="Pay with Health Coins" />
                        </InputGroup>
                    </Col>
                    <Col xs="auto">
                        <Button>
                            Pay Now
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Wallet;