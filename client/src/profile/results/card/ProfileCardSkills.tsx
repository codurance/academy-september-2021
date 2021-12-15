import React from "react";
import {ProfileSkill} from "skillset";
import {Grid} from "semantic-ui-react";

type Props = {
    skills: ProfileSkill[];
    requestedSkills: string[]
};

export const ProfileCardSkills: React.FC<Props> = ({skills, requestedSkills}) => {

    const skillNames = skills.flatMap(skill => skill.name);

    const matchingSkills = skillNames
        .filter(skill => {
            const unformattedRequestedSkills = requestedSkills.map(name => name.toLowerCase());
            const unformattedSkill = skill.toLowerCase();
            return unformattedRequestedSkills.includes(unformattedSkill);
        });

    const partialRemainingSkills = skillNames
        .filter(skill => {
            const unformattedMatchingSkills = matchingSkills.map(name => name.toLowerCase());
            const unformattedSkill = skill.toLowerCase();
            return !unformattedMatchingSkills.includes(unformattedSkill);
        })
        .splice(0, 2);


    const formatSkillDisplayList = (skills: string[]) => skills
        .join(', ')
        .replace(/, ([^,]*)$/, ', $1');

    const getRemainingSkillsNotDisplayed = () => skills.length - (matchingSkills.length + partialRemainingSkills.length);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <span style={{fontWeight: 'bold'}}>{formatSkillDisplayList(matchingSkills)}</span>

                    {partialRemainingSkills.length > 0 &&
                    <span>{`,  ${formatSkillDisplayList(partialRemainingSkills)}`}</span>
                    }
                </Grid.Column>
            </Grid.Row>

            {getRemainingSkillsNotDisplayed() > 0 &&
            <Grid.Row style={{padding: '0.5rem 0 0.5rem 0'}}>
                <Grid.Column
                    verticalAlign={"bottom"}>+ {getRemainingSkillsNotDisplayed()} more</Grid.Column>
            </Grid.Row>
            }
        </Grid>
    );
};