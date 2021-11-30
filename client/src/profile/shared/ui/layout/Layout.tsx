import {Grid, Image} from "semantic-ui-react";
import React from "react";
import {AuthenticatedUserStore} from "../../../../shared/authentication/persistence";
import {Outlet} from "react-router-dom";

type Props = {
    authenticatedUserStore: AuthenticatedUserStore;
}

export const Layout = ({authenticatedUserStore}: Props) => {
    const authenticatedUser = authenticatedUserStore.get();

    return (
        <div>
            <Grid columns={3} textAlign='right' padded style={{paddingRight: '2em'}}>
                <Grid.Row>
                    <Grid.Column floated='right'>
                        <Image src={authenticatedUser?.profileImageUrl} alt="Profile Image" circular size="tiny" floated='right'/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{paddingTop: '0', paddingBottom: '0'}}>
                    <Grid.Column floated='right'>
                        <p>{authenticatedUser?.name}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 800}}>
                    <Outlet/>
                </Grid.Column>
            </Grid>
        </div>
    );
}