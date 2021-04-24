import React from "react";
import QrReader from 'react-qr-reader';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showScanner: true,
            showSpinner: false,
            showAlert: false,
            delay: 1000,
            progress: 0,
            legacyMode: false,
            alertMessage: ''
        }
        this.qrReaderRef = React.createRef();
    }

    handleScan = async (productItemId) => {
        if (productItemId) {
            this.setState({
                showScanner: false,
                showSpinner: true,
            });
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/product/redeem', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'auth-token': token
                },
                body: JSON.stringify({
                    productItemId: productItemId
                })
            });
            this.setState({
                showSpinner: false
            });
            if (response.ok) {
                const product = await response.json();
                this.setState({
                    alertMessage: `Woohoo, You received ${product.noOfCoins} Health Coins!`,
                    showAlert: true
                });
            } else {
                this.setState({
                    alertMessage: "Oops, The item is already redeemed!",
                    showAlert: true
                });
            }
        }
    }

    openImageDialog = () => {
        this.qrReaderRef.current.openImageDialog()
    }

    handleError = (err) => {
        this.setState({ legacyMode: true })
    }

    showAlert = (isShow) => {
        this.setState({ showAlert: isShow });
    }

    render() {
        if (this.state.showScanner) {
            const { delay, legacyMode } = this.state;
            const hozContainerStyle = legacyMode ? { width: '100%', maxWidth: '500px' } : { width: '50%' };
            return (
                <div style={hozContainerStyle}>
                    <QrReader
                        ref={this.qrReaderRef}
                        delay={delay}
                        onError={(err) => this.handleError(err)}
                        onScan={(r) => this.handleScan(r)}
                        legacyMode={legacyMode}
                    />
                    {legacyMode ?
                        <Button variant="primary" onClick={(e) => this.openImageDialog()}>Submit QR Code</Button>
                        : <div></div>
                    }
                </div>
            );
        } else if (this.state.showSpinner) {
            return (
                <Container fluid>
                    <br />
                    <br />
                    <Row>
                        <Col sm={1}></Col>
                        <Col>
                            <Spinner animation="border" variant="info" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container fluid>
                    <Row>
                        <Col xs={6}>
                            <Toast onClose={() => this.showAlert(false)} show={this.state.showAlert} delay={5000} autohide>
                                <Toast.Header>
                                    <strong className="mr-auto">Health Coins</strong>
                                    <small>2 seconds ago</small>
                                </Toast.Header>
                                <Toast.Body>{this.state.alertMessage}</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <Button variant="outline-success" onClick={() => { this.setState({ showScanner: true }) }}>Scan Another</Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Scan;