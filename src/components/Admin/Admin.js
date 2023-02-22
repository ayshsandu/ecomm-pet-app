import { Container, Table, Button, Modal, Form } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import { state, useAuthContext } from "@asgardeo/auth-react";

export default function Admin() {
    const [items, setItems] = useState([]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItem, setNewItem] = useState({
        id: "",
        title: "",
        description: "",
        includes: "",
        intendedFor: "",
        color: "",
        material: "",
        price: 0,
        isAvailable: true
    });
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
        async function fetchItems() {
            const response = await httpRequest(requestConfig);
            setItems(response.data);
        }

        fetchItems();
    }, []);

    useEffect(() => {
        document.title = "Admin | PetStore"
    }, []);

    const handleNewItemChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'price' ? Number(value) : value;
        setNewItem((prevNewItem) => ({
            ...prevNewItem,
            [name]: newValue
        }));
    };

    const handleAddItemSubmit = async () => {
        const response = [];

        const postRequestConfig = ({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*,http://localhost:3000"
            },
            method: "POST",
            url: baseUrl + '/items',
            data: [newItem],
            withCredentials: false

        });

        httpRequest(postRequestConfig)
            .then((response) => {
                 console.log(response);
                 setItems((prevItems) => [...prevItems, response.data[0]]);
                 setShowAddItemModal(false);
            })
            .catch((error) => {
                 console.error(error);
            });
    };

    return (
        <>
            <Container className="mt-5">
                <Table bordered hover>
                    <thead>
                        <tr>

                            <th scope="col" width="150px">Title</th>
                            <th scope="col" width="400px">Description</th>
                            <th scope="col">Includes</th>
                            <th scope="col">Intended For</th>
                            <th scope="col" width="50px">Color</th>
                            <th scope="col">Material</th>
                            <th scope="col">Price</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="align-middle">
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.includes}</td>
                                <td>{item.intendedFor}</td>
                                <td>{item.color}</td>
                                <td>{item.material}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button variant="primary" size="sm">Edit</Button>&nbsp;
                                    <Button variant="danger" size="sm">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button onClick={() => setShowAddItemModal(true)}>Add Item</Button>
            </Container>
            <Modal open={showAddItemModal} onClose = {() => setShowAddItemModal(false)}>
                <Modal.Header>Add Item</Modal.Header>   
                <Modal.Content>
                    <Form>
                    <Form.Field>
                            <label>Code</label>
                            <input name="id" value={newItem.id} onChange={handleNewItemChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Title</label>
                            <input name="title" value={newItem.title} onChange={handleNewItemChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input name="description" value={newItem.description} onChange={handleNewItemChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Includes</label>
                            <input name="includes" value={newItem.includes} onChange={handleNewItemChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Intended For</label>
                            <input name="intendedFor" value={newItem.intendedFor} onChange={handleNewItemChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Color</label>
                            <input name="color" value={newItem.color} onChange={handleNewItemChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Material</label>
                            <input name="material" value={newItem.material} onChange={handleNewItemChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input name="price" value={newItem.price} onChange={handleNewItemChange}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setShowAddItemModal(false)}>Cancel</Button>
                    <Button onClick={handleAddItemSubmit}>Add</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

