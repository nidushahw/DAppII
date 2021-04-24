import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QRCode from 'qrcode.react';

class ProductItems extends React.Component {
    render() {
        const productItems = this.props.items.map((product, index) => {
            return (
                <Card border="info" key={index} style={{textAlign: "center"}}>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <QRCode value={product._id} />
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{product._id}</small>
                    </Card.Footer>
                </Card>
            );
        });

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <CardColumns>
                            {productItems}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProductItems;