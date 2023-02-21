// import logo from './logo.svg';
import React, { useEffect } from 'react';
// import './App.css';
//  import './App.scss';
// import { Nav, Navbar, Container }  from 'react-bootstrap';
import { Menu, Container, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';

// Component to render the login/signup/logout menu
const RightLoginSignupMenu = () => {
  const { state, signIn, signOut } = useAuthContext();

  // Based on Asgardeo SDK, set a variable like below to check and conditionally render the menu
  let isLoggedIn = state.isAuthenticated;

  // Host the menu content and return it at the end of the function
  let menu;

  // Conditionally render the following two links based on whether the user is logged in or not
  if (isLoggedIn) {
    menu = (
      <Menu.Item position="right">
        <Button primary onClick={() => signOut()}>
          Logout
        </Button>
        <Menu.Item>
          <FontAwesomeIcon icon={faUser} /> Hi!{" "}
          {state.username ? state.username : ""}
        </Menu.Item>
      </Menu.Item>
    );
  } else {
    menu = (
      <Menu.Item position="right">
        <Button primary onClick={() => signIn()}>
          Login
        </Button>
        <Menu.Item>
          <a href="https://accounts.asgardeo.io/t/ayeshaecomm/accountrecoveryendpoint/register.do?client_id=jA1feJUbpfcLfBmOfBgFfvdIrJwa">
            Sign Up
          </a>
        </Menu.Item>
      </Menu.Item>
    );
  }
  return menu;
}

// Component to render the navigation bar
const PetStoreNav = () => {
  return (
    <>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          PetStore
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item href="/" name="Catalog" />
          <Menu.Item href="/mycart" name="My Cart" />
          <Menu.Item href="/admin" name="Admin" />
          <RightLoginSignupMenu />
        </Menu.Menu>
      </Container>
    </Menu>
    </>
  );
};

// Main app component
const App = () => {
  useEffect(() => {
    document.title = 'PetStore';
  }, []);
  return (
    <>
    <BrowserRouter>
    <PetStoreNav />
      <Switch>
        <Route path="/" component={Catalog} />
        <Route path="/mycart" component={MyCart} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;