import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReactToPrint from 'react-to-print';
import Products from './Products';
import ProductItems from "./ProductItems";

class PartnerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productSummary: [],
            productItems: [],
            showModal: false,
            isSubmitting: false,
            name: '',
            description: '',
            noOfCoins: 0,
            quantity: 0,
            showItems: false
        }
    }

    componentDidMount = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/product/summary', {
            headers: {
                'auth-token': token
            }
        });
        if (response.ok) {
            const summary = await response.json();
            this.setState({ productSummary: summary });
        }
    }

    handleAddProduct = () => {
        this.setState({ showModal: true });
    }

    handleClose = () => {
        this.setState({ showModal: false });
    }

    handleChange = (event, name) => {
        let value = {};
        value[name] = event.target.value;
        this.setState(value);
    }

    handleSubmit = async () => {
        this.setState({ isSubmitting: true });
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/product/add', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'auth-token': token
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                noOfCoins: this.state.noOfCoins,
                quantity: this.state.quantity
            })
        });
        if (response.ok) {
            const summary = await response.json();
            this.setState({ productSummary: summary });
        }
        this.setState({ showModal: false, isSubmitting: false });
    }

    handleProductSelect = async (name) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/product/search/${name}`, {
            headers: {
                'auth-token': token
            }
        });
        if (response.ok) {
            const summary = await response.json();
            this.setState({ productItems: summary });
            this.setState({ showItems: true });
        }
    }

    render() {
        return (
            <>
                {this.state.showItems ?
                    <Container fluid>
                        <Row>
                            <Col sm={1}>
                                <Button variant="outline-dark" onClick={() => { this.setState({ showItems: false }) }}>Back</Button>
                            </Col>
                            <Col>
                                <ReactToPrint
                                    trigger={() => {
                                        return <Button variant="outline-success" >Print this out!</Button>;
                                    }}
                                    content={() => this.componentRef}
                                />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <ProductItems items={this.state.productItems} ref={el => (this.componentRef = el)} />
                    </Container>
                    :
                    <Container fluid>
                        <Row>
                            <Col><Button variant="outline-success" onClick={this.handleAddProduct}>Add Product</Button></Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Col>
                                <Products products={this.state.productSummary} onClickProduct={this.handleProductSelect} />
                            </Col>
                        </Row>
                    </Container>
                }

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control placeholder="Product name" onChange={(e) => { this.handleChange(e, 'name') }} />
                                </Form.Group>
                                <Form.Group controlId="formGridDesc">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control placeholder="Product description" onChange={(e) => { this.handleChange(e, 'description') }} />
                                </Form.Group>
                                <Form.Group controlId="formGridCoins">
                                    <Form.Label>Coins per item</Form.Label>
                                    <Form.Control type="number" min={1} placeholder="Number of coins per item" onChange={(e) => { this.handleChange(e, 'noOfCoins') }} />
                                </Form.Group>
                                <Form.Group controlId="formGridQty">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" min={1} placeholder="Number of items" onChange={(e) => { this.handleChange(e, 'quantity') }} />
                                </Form.Group>
                            </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success" onClick={this.handleSubmit} disabled={this.state.isSubmitting}>
                            Add
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default PartnerHome;