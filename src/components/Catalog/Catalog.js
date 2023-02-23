import React, { useState, useEffect } from 'react';
import { Container, Input, Card } from 'semantic-ui-react';
import ItemCard from './ItemCard';
import {useAuthContext } from "@asgardeo/auth-react";

function Catelog() {
  const [items, setitems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const baseUrl = process.env.REACT_APP_RESOURCE_SERVER_URL;

  const { state, httpRequest } = useAuthContext();
  var path = "/items"; 
  var isAttachToken = false;
  var isWithCredentials = false;
  //* if the user is not authenticated define a separate URL
  if (state.isAuthenticated) {
    path = "/itemsforuser";
    isAttachToken = true;
    // isWithCredentials = true;
  }
  const requestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    method: "GET",
    url: baseUrl + path,
    attachToken: isAttachToken,
    withCredentials: isWithCredentials
  };

  useEffect(() => {
    async function fetchitems() {
      console.log('baseUrl', baseUrl);
      const response = await httpRequest(requestConfig);
      console.log(response.data);
      setitems(response.data);
    }

    fetchitems();
  }, []);

  useEffect(() => {
    const results = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [items, searchTerm]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  // show book list
  return (
    <Container>
      <Input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        fluid
      />
      <Card.Group itemsPerRow={4}>
        {searchResults.map(item => (
          <ItemCard key={item.id} item={item} isAuthenticated ={state.isAuthenticated} loggedInUserId={state.sub} />
        ))}
      </Card.Group>
    </Container>
  );

}

export default Catelog;
