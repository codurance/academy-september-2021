import {Container, Dropdown, Grid, Image} from "semantic-ui-react";
import React from "react";
import {Outlet} from "react-router-dom";
import {ProfileFeatureNavigator} from "../../navigation";
import logo from "../../../../shared/ui/logo.svg";
import {AuthenticatedUserService} from "../../../../shared/authentication/service/AuthenticatedUserService";

type Props = {
    authenticatedUserService: AuthenticatedUserService;
    profileFeatureNavigator: ProfileFeatureNavigator;
};

export const Layout: React.FC<Props> = ({authenticatedUserService, profileFeatureNavigator}) => {
    const authenticatedUser = authenticatedUserService.getAuthenticatedUser();

    return (
        <div>
            <Grid columns={3} textAlign='right' padded style={{paddingRight: '2em', paddingLeft: '1em'}}>
                <Grid.Row>
                    <Grid.Column floated='left'>
                        <div onClick={() => profileFeatureNavigator.navigateToSearch()}>
                            <Image
                                src={logo}
                                alt="Home"
                                style={{height: '55px', width: '55px', padding: '0.5rem', cursor: 'pointer'}}
                                floated='left'
                                bordered
                                rounded/>
                        </div>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <div>
                            <Image
                                src={authenticatedUser?.profileImageUrl}
                                alt="Profile Image"
                                size="tiny"
                                floated='right'
                                circular/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{paddingTop: '0', paddingBottom: '0'}}>
                    <Grid.Column floated='right'>
                        <Dropdown text={authenticatedUser?.name} direction={"right"}>
                            <Dropdown.Menu style={{paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>
                                <Dropdown.Item text="Profile" onClick={() => profileFeatureNavigator.navigateToProfile()} />
                                <Dropdown.Item text="Logout" onClick={() => authenticatedUserService.logout()} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Container style={{paddingBottom: '5rem'}}>
                <Outlet/>
            </Container>
        </div>
    );
};