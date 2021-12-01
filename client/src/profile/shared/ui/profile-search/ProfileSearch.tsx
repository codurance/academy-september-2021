import {Form, Icon, Input, Message} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileSearchQuery} from "../../domain";

type Props = {
    profileSearchService: ProfileSearchService;
    query?: ProfileSearchQuery;
}

export const ProfileSearch = ({profileSearchService, query}: Props) => {
    const [hasSearchError, setHasSearchError] = useState(false);
    const [skills, setSkills] = useState('');

    useEffect(() => {
        const requestedSkills = query?.skills.join(', ') ?? '';
        setSkills(requestedSkills)
    }, [query])

    async function search(): Promise<void> {
        const query: ProfileSearchQuery = {skills: parseSkills()};

        await profileSearchService
            .search(query)
            .catch(() => setHasSearchError(true));
    }

    const parseSkills = () => skills
        .replace(/\s/g, '')
        .split(',');

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
                        <input type='text' required value={skills} onChange={e => setSkills(e.target.value)}/>
                        <Icon name='search' aria-label='Search' onClick={search} link/>
                    </Input>
                </Form.Field>
            </Form>
        </>
    )
}