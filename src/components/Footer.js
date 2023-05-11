import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';


function Footer() {
  return (
    <Segment inverted vertical style={{ }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <h4>About</h4>
              <p>
              Welcome to Snout & Paws Shop, the ultimate destination for all your furry friend's needs! 
              At Snout & Paws Shop, we understand the deep bond between humans and their beloved pets. 
              That's why we strive to provide a carefully curated collection of products that cater to their every need and desire. 
              </p>
            </Grid.Column
>            <Grid.Column width={4}>
              <h4>Contact us</h4>
              <p>+94777603866</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default Footer;
