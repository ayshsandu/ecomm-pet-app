// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useAuthContext, SecureRoute } from "@asgardeo/auth-react";

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';

// Main app component
const App = () => {
  // Define cart and add to cart variables to pass to the MyCart component
  const [cart, setCart] = useState([]);

  // Component to render the login/signup/logout menu
  const RightLoginSignupMenu = () => {
    const { state, signIn, signOut } = useAuthContext();
    const signUpURL = "https://accounts.asgardeo.io/t/ayeshaecomm/accountrecoveryendpoint/register.do?client_id="
      + process.env.REACT_APP_CLIENT_ID + "&sp=" + process.env.REACT_APP_APPLICATION_NAME;

    // Based on Asgardeo SDK, set a variable like below to check and conditionally render the menu
    let isLoggedIn = state.isAuthenticated;

    // Host the menu content and return it at the end of the function
    let menu;

    // Conditionally render the Mycart and Admin links based on whether the user is logged in or not
    if (isLoggedIn) {
      if (state.allowedScopes.includes(process.env.REACT_APP_ADD_ITEMS_SCOPE)) {
        menu = (
          <Menu.Item position="right">
            <Menu.Item as={Link} to="/admin" name="Admin" />
            <Menu.Item as={Link} to="/mycart" name="My Cart" />
            <Menu.Item>
              <FontAwesomeIcon icon={faUser} />
              {state.username ? state.username : ""}
            </Menu.Item>
            <Button primary onClick={() => signOut()}>
              Logout
            </Button>
          </Menu.Item>
        );
      } else {
        menu = (
          <Menu.Item position="right">
            <Menu.Item as={Link} to="/mycart" name="My Cart" content={`Cart (${cart.length})`} icon="cart"/>
            <Menu.Item>
              <FontAwesomeIcon icon={faUser} />
              {state.username ? state.username : ""}
            </Menu.Item>
            <Button primary onClick={() => signOut()}>
              Logout
            </Button>
          </Menu.Item>
        );
      }
    } else {
      menu = (
        <Menu.Item position="right">
          {/* pass a callback function to signIn method */}
          <Button primary onClick={() => signIn()}>
            {/* <Button primary onClick={() => signIn({})}> */}
            Login
          </Button>
          <Menu.Item>
            <a href={signUpURL}>
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
        <Menu inverted>
          <Container>
            <Menu.Item as="a" header href="/" >
              PetStore
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/" name="Catalog" />
              {/* <Menu.Item href="/admin" name="Admin" /> */}
              <RightLoginSignupMenu />
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    );
  };

  const addToCart = item => {
    setCart([...cart, item]);
  };


  useEffect(() => {
    document.title = 'PetStore';
  }, []);
  return (
    <>
      <BrowserRouter>
        <PetStoreNav />
        <Switch>
          <Route exact path="/">
            <Catalog cart={cart} handleAddToCart={addToCart} />
          </Route>
          <Route path="/mycart">
            <MyCart cart={cart}/>
          </Route>
          <SecureRoute path="/admin">
            <Admin />
          </SecureRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
