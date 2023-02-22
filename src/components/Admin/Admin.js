// import { Container, Button, Table }  from 'react-bootstrap';
import { Container, Table, Button } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import { state, useAuthContext } from "@asgardeo/auth-react";

export default function Admin() {
    const [items, setitems] = useState([]);
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
        document.title = "Admin | PetStore"
    }, []);

    // return (
    //     <>
    //     <Container className="mt-5">
    //         <Table bordered hover>
    //             <thead>
    //                 <tr>
    //                     <th scope="col" width="150px">Title</th>
    //                     <th scope="col" width="400px">Description</th>
    //                     <th scope="col">Includes</th>
    //                     <th scope="col">Intended For</th>
    //                     <th scope="col" width="50px">Color</th>
    //                     <th scope="col">Material</th>
    //                     <th scope="col">Price</th>
    //                     <th scope="col">&nbsp;</th>
    //                 </tr>
    //                 <tr className="align-middle">
    //                     <td>Top Paw® Valentine's Day Single Dog Sweater</td>
    //                     <td>Top Paw® Valentine's Day Single Dog Sweater is a cute and cozy way to show your dog some love this Valentine's Day. This sweater features a red heart on the back and a red bow on the front. It's made of soft, comfortable cotton and polyester blend fabric. It's machine washable for easy care. This sweater is available in sizes XS, S, M, L, XL and XXL... </td>
    //                     <td>1 Sweater</td>
    //                     <td>Dogs</td>
    //                     <td>Red, White, Black</td>
    //                     <td>100% Acrylic</td>
    //                     <td>$14.99</td>
    //                     <td><Button variant="primary" size="sm">Edit</Button>&nbsp;<Button variant="danger" size="sm">Delete</Button></td>
    //                 </tr>
    //                 <tr className="align-middle">
    //                     <td>Top Paw® Valentine's Day Single Dog Sweater</td>
    //                     <td>Top Paw® Valentine's Day Single Dog Sweater is a cute and cozy way to show your dog some love this Valentine's Day. This sweater features a red heart on the back and a red bow on the front. It's made of soft, comfortable cotton and polyester blend fabric. It's machine washable for easy care. This sweater is available in sizes XS, S, M, L, XL and XXL... </td>
    //                     <td>1 Sweater</td>
    //                     <td>Dogs</td>
    //                     <td>Red, White, Black</td>
    //                     <td>100% Acrylic</td>
    //                     <td>$14.99</td>
    //                     <td><Button variant="primary" size="sm">Edit</Button>&nbsp;<Button variant="danger" size="sm">Delete</Button></td>
    //                 </tr>
    //                 <tr className="align-middle">
    //                     <td>Top Paw® Valentine's Day Single Dog Sweater</td>
    //                     <td>Top Paw® Valentine's Day Single Dog Sweater is a cute and cozy way to show your dog some love this Valentine's Day. This sweater features a red heart on the back and a red bow on the front. It's made of soft, comfortable cotton and polyester blend fabric. It's machine washable for easy care. This sweater is available in sizes XS, S, M, L, XL and XXL... </td>
    //                     <td>1 Sweater</td>
    //                     <td>Dogs</td>
    //                     <td>Red, White, Black</td>
    //                     <td>100% Acrylic</td>
    //                     <td>$14.99</td>
    //                     <td><Button variant="primary" size="sm">Edit</Button>&nbsp;<Button variant="danger" size="sm">Delete</Button></td>
    //                 </tr>
    //                 <tr className="text-end">
    //                     <td colSpan="8"><Button variant="primary" className="float-right">Add New Product</Button></td>
    //                 </tr>
    //             </thead>
    //         </Table>
    //     </Container>
    //     </>
    // );
    return (
        <Container className="mt-5">
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Includes</Table.HeaderCell>
                        <Table.HeaderCell>Intended For</Table.HeaderCell>
                        <Table.HeaderCell>Color</Table.HeaderCell>
                        <Table.HeaderCell>Material</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>{item.includes}</Table.Cell>
                            <Table.Cell>{item.intendedFor}</Table.Cell>
                            <Table.Cell>{item.color.join(', ')}</Table.Cell>
                            <Table.Cell>{item.material}</Table.Cell>
                            <Table.Cell>${item.price}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Button variant="primary" className="float-right">Add New Product</Button>
        </Container>
    );

}