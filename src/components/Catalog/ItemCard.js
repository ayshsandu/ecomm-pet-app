import React from 'react';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function ItemCard({item }) {
    const imageUrl = item.image_url || 'https://via.placeholder.com/150';

    return (
        <Card as={Link} to={`/${item.id}`}>
            <Image src={imageUrl} wrapped ui={false} size="small" />
            <Card.Content className="left aligned">
                <Card.Header>{item.title}</Card.Header>
                <Card.Meta>
                    <span>{item.author}</span>
                </Card.Meta>
                <Card.Description>
                    {item.description}
                </Card.Description>
                {!item.isAvailable ? 
                (
                    <Label as='a'>
                        Borrowed
                    </Label>
                ) : (
                <Label as='a'>
                    Available
                </Label>
                )}
            </Card.Content>
            <Card.Content className="right aligned" extra>
                <a>
                    <Icon name='user' />
                    <span>{item.readcount}</span>
                </a>
                <Button primary>Info</Button>
            </Card.Content>
        </Card>
    );
}

export default ItemCard;