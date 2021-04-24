import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navigation from "./component/Navigation";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Scan from "./component/Scan";
import Wallet from "./component/Wallet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: ''
    }
  }

  handleLoginEvent = (isLogin) => {
    let email = isLogin ? localStorage.getItem('email') : '';
    this.setState({
      isLogin: isLogin,
      email: email
    });
  }

  render() {
    return (
      <BrowserRouter history={History}>
        <Container>
          <br />
          <Navigation isLogin={this.state.isLogin} email={this.state.email} onLogout={this.handleLoginEvent} />
          <br />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path='/Login'
              render={(props) => (
                <Login {...props} onLogin={this.handleLoginEvent} />
              )}
            />
            <Route path="/Signup" component={Signup} />
            <Route path="/Scan" component={Scan} />
            <Route path="/Wallet" component={Wallet} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;


