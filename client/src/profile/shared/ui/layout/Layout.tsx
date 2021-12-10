import {Container, Grid, Image} from "semantic-ui-react";
import React from "react";
import {AuthenticatedUserStore} from "../../../../shared/authentication/persistence";
import {Outlet} from "react-router-dom";
import {ProfileFeatureNavigator} from "../../navigation";
import logo from "../../../../shared/ui/logo.svg";

type Props = {
    authenticatedUserStore: AuthenticatedUserStore;
    profileFeatureNavigator: ProfileFeatureNavigator;
};

export const Layout: React.FC<Props> = ({authenticatedUserStore, profileFeatureNavigator}) => {
    const authenticatedUser = authenticatedUserStore.get();

    return (
        <div>
            <Grid columns={3} textAlign='right' padded style={{paddingRight: '2em', paddingLeft: '1em'}}>
                <Grid.Row>
                    <Grid.Column floated='left'>
                        <div onClick={() => profileFeatureNavigator.navigateToSearch()}>
                            <Image
                                src={logo}
                                alt="Home"
                                style={{height: '6vh', width: '6vh', padding: '0.5rem', cursor: 'pointer'}}
                                floated='left'
                                bordered
                                rounded/>
                        </div>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <div onClick={() => profileFeatureNavigator.navigateToProfile()}>
                            <Image
                                src={authenticatedUser?.profileImageUrl}
                                alt="Profile Image"
                                style={{cursor: 'pointer'}}
                                size="tiny"
                                floated='right'
                                circular/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{paddingTop: '0', paddingBottom: '0'}}>
                    <Grid.Column floated='right'>
                        <p>{authenticatedUser?.name}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Container style={{paddingBottom: '5rem'}}>
                <Outlet/>
            </Container>
        </div>
    );
};