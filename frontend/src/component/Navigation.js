import { Link, withRouter } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Navigation = (props) => {

  let handleLogout = () => {
    localStorage.clear();
    props.onLogout(false);
    props.history.push("/Login");
  }

  return (
    <Navbar bg="light" variant="light">
      <Nav variant="light" defaultActiveKey="Login">
        <Nav.Item>
          <Nav.Link eventKey="Home" as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Scan" as={Link} to="/Scan">Scan</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Wallet" as={Link} to="/Wallet">Wallet</Nav.Link>
        </Nav.Item>
      </Nav>
      {props.isLogin ?
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <b>{props.email}</b>
          </Navbar.Text>
          {'\u00A0'}
          <Button variant="link" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
        : ''
      }
    </Navbar>

  );
};

export default withRouter(Navigation);