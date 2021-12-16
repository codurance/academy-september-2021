import {ProfileSkill} from "skillset";
import React from "react";
import {Grid, Header, Rating} from "semantic-ui-react";

type Props = {
    skills: ProfileSkill[];
};

export const ProfileModalSkills: React.FC<Props> = ({skills}) => {
    return (
        <>
            <Header as="h1">Skills</Header>
            <Grid padded verticalAlign={"middle"}>
                <Grid.Row>
                    {skills?.map(skill => (
                        <Grid.Column computer={8} key={skill.name} style={{padding: '1rem'}} verticalAlign="middle">
                            <Header as="h3">
                                <Header.Content>{skill.name}</Header.Content>
                                <Rating
                                    defaultRating={skill.level}
                                    maxRating={5}
                                    size="massive"
                                    disabled
                                    style={{paddingLeft: '1rem', color: '#EE7726'}}/>
                            </Header>

                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </>
    );
};