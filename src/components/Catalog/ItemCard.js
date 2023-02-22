import React from 'react';
import { Card, Icon, Image, Button, Label, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function ItemCard({ item }) {
    const imageUrl = item.image_url || 'https://via.placeholder.com/150';

    return (
        <Card as={Link} to={`/${item.id}`}>
            <Image src={imageUrl} wrapped ui={false} size="small" />
            <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Card.Meta>{item.id}</Card.Meta>
                <Card.Description>{item.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p>Includes: {item.includes}</p>
                <p>Intended For: {item.intendedFor}</p>
                <p>Color: {item.color.join(', ')}</p>
                <p>Material: {item.material}</p>
            </Card.Content>
            <Card.Content extra>
                <Grid columns={2}>
                    <Grid.Column>
                        <Card.Header color='orange' as='h3'>${item.price}</Card.Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Button primary floated='right'>Add to cart</Button>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>
    );
}

export default ItemCard;