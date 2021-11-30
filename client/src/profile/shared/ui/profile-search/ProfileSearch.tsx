import {Form, Icon, Input, Message} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileSearchQuery} from "../../domain/ProfileSearchQuery";

type Props = {
    profileSearchService: ProfileSearchService;
    query?: ProfileSearchQuery;
}

export const ProfileSearch = ({profileSearchService, query}: Props) => {
    const [hasSearchError, setHasSearchError] = useState(false);
    const [skill, setSkill] = useState('');

    useEffect(() => {
        const requestedSkill = query?.skills[0] ?? '';
        setSkill(requestedSkill)
    }, [query])

    async function search() {
        const query: ProfileSearchQuery = {
            skills: [skill]
        };

        await profileSearchService
            .search(query)
            .catch(() => setHasSearchError(true));
    }

    return (
        <>
            {hasSearchError &&
            <Message error>
                <Message.Header>Network Error, try again.</Message.Header>
            </Message>
            }

            <Form onSubmit={search}>
                <Form.Field>
                    <Input icon placeholder='Java, TypeScript, React...'>
                        <input type='text' required value={skill} onChange={e => setSkill(e.target.value)}/>
                        <Icon name='search' aria-label='Search' onClick={search} link/>
                    </Input>
                </Form.Field>
            </Form>
        </>
    )
}