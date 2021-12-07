import {Container, Grid, Image} from "semantic-ui-react";
import React from "react";
import {AuthenticatedUserStore} from "../../../../shared/authentication/persistence";
import {Outlet} from "react-router-dom";
import {ProfileFeatureNavigator} from "../../navigation";

type Props = {
    authenticatedUserStore: AuthenticatedUserStore;
    profileFeatureNavigator: ProfileFeatureNavigator;
};

export const Layout: React.FC<Props> = ({authenticatedUserStore, profileFeatureNavigator}) => {
    const authenticatedUser = authenticatedUserStore.get();

    return (
        <div>
            <Grid columns={3} textAlign='right' padded style={{paddingRight: '2em'}}>
                <Grid.Row>
                    <Grid.Column floated='right'>
                        <div className="link" onClick={() => profileFeatureNavigator.navigateToProfile()}>
                            <Image src={authenticatedUser?.profileImageUrl} alt="Profile Image" circular size="tiny"
                                   floated='right'/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{paddingTop: '0', paddingBottom: '0'}}>
                    <Grid.Column floated='right'>
                        <p>{authenticatedUser?.name}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Container>
                <Outlet/>
            </Container>
        </div>
    );
};