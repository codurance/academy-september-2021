import React from "react";
import {Grid, Header, Image} from "semantic-ui-react";
import easterEgg from "./easter-egg.png";
import {Link} from "react-router-dom";

export const NotFound: React.FC = () => {
    return (
        <Grid textAlign='center' style={{height: '80vh'}} verticalAlign='middle'>
            <Grid.Column textAlign="center">
                <Header as="h1" style={{fontFamily: 'Orbitron', fontSize: '4em'}}>Oops</Header>
                <Header as="h1">That page doesn&apos;t exist</Header>
                <Link to="/">Go Home</Link>
                <Image src={easterEgg} centered style={{paddingTop: '2rem'}}/>
            </Grid.Column>
        </Grid>
    );
};