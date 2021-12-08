import {Form, Icon, Input, Message, Checkbox} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileSearchQuery} from "skillset";

type Props = {
    profileSearchService: ProfileSearchService;
    query?: ProfileSearchQuery;
};

export const ProfileSearch: React.FC<Props> = ({profileSearchService, query}: Props) => {
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [hasSearchError, setHasSearchError] = useState(false);
    const [skills, setSkills] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const requestedSkills = query?.skills.join(', ') ?? '';
        const requestedIsAvailable = query?.isAvailable ?? false;
        setSkills(requestedSkills);
        setIsAvailable(requestedIsAvailable);
    }, [query]);

    async function search(): Promise<void> {
        const query: ProfileSearchQuery = {skills: parseSkills(), isAvailable: isAvailable};
        setIsLoadingSearch(true);

        await profileSearchService
            .search(query)
            .catch(() => setHasSearchError(true))
            .finally(() => setIsLoadingSearch(false));
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
                        <input type='text' required value={skills} onChange={e => setSkills(e.target.value)} disabled={isLoadingSearch}/>
                        {isLoadingSearch
                            ? <Icon name='circle notch' aria-label='Loading' loading/>
                            : <Icon name='search' aria-label='Search' onClick={search} link/>
                        }
                    </Input>
                </Form.Field>
                <Form.Field style={{textAlign: 'left'}}>
                    <Checkbox
                        label='Only show available consultants'
                        checked={isAvailable}
                        onClick={() => setIsAvailable(!isAvailable)}
                    />
                </Form.Field>
            </Form>
        </>
    );
};