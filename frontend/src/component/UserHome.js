import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from './Badge';
import Bio from './Bio';
import Feed from './Feed'
import FriendList from './FriendList';

function UserHome() {
    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <Badge />
                    <Bio />
                </Col>
                <Col>
                    <Feed />
                </Col>
                <Col>
                    <FriendList />
                </Col>
            </Row>
        </Container>
    );
}

export default UserHome;