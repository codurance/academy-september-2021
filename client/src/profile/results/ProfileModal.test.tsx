import {Profile} from "skillset";
import {render, screen} from "@testing-library/react";
import {ProfileModal} from "./ProfileModal";
import React from "react";

describe('profile modal', () => {
    test.skip("should display a consultant's profile information", () => {
        const profile: Profile = {
            name: 'Jordan Steele',
                email: 'jordan.steele@codurance.com',
                role: 'Software Craftsperson',
                location: 'Remote',
                imageUrl: "http://localhost:3000/profile/jordan.steele.png",
                skills: [{name: 'Java', level: 4}, {name: 'Kotlin', level: 3}],
                availability: {
                isAvailable: false,
                    client: "Best Company"
            }
        };

        render(<ProfileModal profile={profile} isVisible={true} setIsVisible={() => true} />);

        expect(screen.getByText('Jordan Steele')).toBeInTheDocument();
        expect(screen.getByText('jordan.steele@codurance.com')).toBeInTheDocument();
        expect(screen.getByText('Software Craftsperson - Remote')).toBeInTheDocument();
        expect(screen.getByText('Java')).toBeInTheDocument();
        expect(screen.getByText('Kotlin')).toBeInTheDocument();
        expect(screen.getByAltText('Profile Image')).toBeInTheDocument();
        expect(screen.getByTestId('unavailable')).toBeInTheDocument();
        expect(screen.getAllByTestId('rating')).toHaveLength(2);
        expect(screen.getAllByTestId('rating')[0].children).toHaveLength(5);
    });
});