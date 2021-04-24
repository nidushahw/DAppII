import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Products extends React.Component {

    render() {
        const products = this.props.products.map((product, index) => {
            let createdDate = new Date(product.createdDate);
            return <tr key={index}>
                <td><Button variant="link" onClick={() => { this.props.onClickProduct(product.name) }}>{product.name}</Button></td>
                <td>{product.description}</td>
                <td>{product.noOfCoins}</td>
                <td>{product.totalCount}</td>
                <td>{product.redeemedCount}</td>
                <td>{createdDate.toUTCString()}</td>
            </tr>
        });

        return <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th># Coins</th>
                        <th>Total</th>
                        <th>Redeemed</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </div>
    }
}

export default Products;