import React, { useState } from 'react';
import { Table, Input, Container } from 'semantic-ui-react';
import UnderConstruction from './UnderConstruction';

function Cart({ cartItems }) {
    const items = [
        {
          id: 1,
          name: "Product A",
          quantity: 2,
          unitPrice: 10.00
        },
        {
          id: 2,
          name: "Product B",
          quantity: 1,
          unitPrice: 5.00
        },
        {
          id: 3,
          name: "Product C",
          quantity: 3,
          unitPrice: 7.50
        }
      ];
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, event) => {
    const newQuantities = { ...quantities };
    newQuantities[itemId] = event.target.value;
    setQuantities(newQuantities);
  };

  const getItemTotal = (item) => {
    const quantity = parseInt(quantities[item.id]) || 0;
    return quantity * item.unitPrice;
  };

  const getTotal = () => {
    let total = 0;
    for (const item of items) {
      total += getItemTotal(item);
    }
    return total;
  };

  return (
    <Container>
        <UnderConstruction />
    {/* <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Unit Price</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
              <Input
                type="number"
                min="0"
                value={quantities[item.id] || item}
                onChange={(e) => handleQuantityChange(item.id, e)}
              />
            </Table.Cell>
            <Table.Cell>${item.unitPrice}</Table.Cell>
            <Table.Cell>${getItemTotal(item)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3" textAlign="right">
            Total
          </Table.HeaderCell>
          <Table.HeaderCell>${getTotal()}</Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table> */}
    </Container>
  );
}

export default Cart;
