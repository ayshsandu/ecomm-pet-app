import React, { useState, useEffect } from 'react';
import { Container, Input, Card } from 'semantic-ui-react';
import ItemCard from './ItemCard';
import { useAuthContext } from "@asgardeo/auth-react";

function Catelog() {
  const [items, setitems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const baseUrl = "https://a302ef70-2e20-4809-a281-8adfc5b8e2f6-dev.e1-us-east-azure.choreoapis.dev/qirz/ecommercerestapi/1.0.0";

  const { httpRequest } = useAuthContext();

  const requestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    method: "GET",
    url: baseUrl + '/items',
    attachToken: false,
    withCredentials: false
  };

  useEffect(() => {
    async function fetchitems() {
      console.log('baseUrl', baseUrl);
      //use Axios for the public API invocation
      // const response = await axios.get(baseUrl + '/items', {
      //   headers: { "Access-Control-Allow-Origin": "*" }
      // }, {});
      // console.log(response.data);
      // setitems(response.data);

      // Use httpRequest from auth-react library
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
      <Card.Group>
        {searchResults.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Card.Group>
    </Container>
  );

}

export default Catelog;
