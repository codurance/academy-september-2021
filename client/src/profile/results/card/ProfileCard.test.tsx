import {Profile} from "skillset";
import {render, screen} from "@testing-library/react";
import {ProfileCard} from "./ProfileCard";

describe('profile card should', () => {
    test('show skills on card with relevant skills to search showing first and remaining skills', () => {
        const profile = {
            skills: [
                {"name": "Angular", "level": 5},
                {"name": "Kotlin", "level": 3},
                {"name": "Android", "level": 2},
                {"name": "TypeScript", "level": 1},
                {"name": "React", "level": 2},
                {"name": "Java", "level": 1}
            ],
            availability: {
                isAvailable: true
            }
        } as Profile;
        const requestedSkills = ['Java', 'React'];

        render(<ProfileCard profile={profile} requestedSkills={requestedSkills} />);

        expect(screen.getByText('React, Java')).toBeInTheDocument();
        expect(screen.getByText(', Angular, Kotlin')).toBeInTheDocument();
        expect(screen.getByText('+ 2 more')).toBeInTheDocument();
    });

    test('does not show remaining when profile skill count does not exceed partial cutoff limit', async () => {
        const profile = {
            skills: [
                {"name": "C#", "level": 4},
                {"name": "Java", "level": 3},
                {"name": "Rust", "level": 1}
            ],
            availability: {
                isAvailable: true
            }
        } as Profile;
        const requestedSkills = ['Rust'];

        render(<ProfileCard profile={profile} requestedSkills={requestedSkills} />);

        expect(screen.getByText('Rust')).toBeInTheDocument();
        expect(screen.getByText(', C#, Java')).toBeInTheDocument();
        expect(screen.queryByText('+ 1 more')).not.toBeInTheDocument();
    });
});