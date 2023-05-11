import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';


function Footer() {
  return (
    <Segment inverted vertical style={{ }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <p>
              At Snout & Paws Shop, we understand the deep bond between humans and their beloved pets. 
              That's why we strive to provide a carefully curated collection of products that cater to their every need and desire. 
              </p>
            </Grid.Column
>            <Grid.Column width={4}>
              <p>Contact us: +94777603866</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default Footer;
