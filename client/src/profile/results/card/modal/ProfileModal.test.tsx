import {Profile} from "skillset";
import {render, screen} from "@testing-library/react";
import {ProfileModal} from "./ProfileModal";
import React from "react";

jest.mock("react-markdown", () => (props: {children: unknown}) => { // eslint-disable-line react/display-name
    return <>{props.children}</>;
});

describe('profile modal should', () => {
    test("display a consultant's profile information", () => {
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
            },
            notes: "my notes"
        };

        render(<ProfileModal profile={profile} isVisible={true} onModalClosed={() => {/* do nothing */
        }}/>);

        expect(screen.getByText('Jordan Steele')).toBeInTheDocument();
        expect(screen.getByAltText('Profile Image')).toHaveAttribute('src', profile.imageUrl);
        expect(screen.getByText('Best Company')).toBeInTheDocument();
        expect(screen.getByText('Software Craftsperson')).toBeInTheDocument();
        expect(screen.getByText('Remote')).toBeInTheDocument();
        expect(screen.getByText('jordan.steele@codurance.com')).toBeInTheDocument();
        expect(screen.getByText('Java')).toBeInTheDocument();
        expect(screen.getByText('Kotlin')).toBeInTheDocument();
        expect(screen.getByText('my notes')).toBeInTheDocument();
    });

    test('display available when profile indicates available', () => {
        const profile: Profile = {
            availability: {
                isAvailable: true
            }
        } as Profile;

        render(<ProfileModal profile={profile} isVisible={true} onModalClosed={() => {/* do nothing */
        }}/>);

        expect(screen.getByText('Available')).toBeInTheDocument();
    });

    test('triggers closed handler when close button pressed', () => {
        const profile: Profile = {
            availability: {
                isAvailable: true
            }
        } as Profile;
        let wasClosed = false;
        const updateClosedStatus = () => {
            wasClosed = true;
        };
        render(<ProfileModal profile={profile} isVisible={true} onModalClosed={updateClosedStatus}/>);

        const closeButton = screen.getByLabelText('Close');
        closeButton.click();

        expect(wasClosed).toBeTruthy();
    });


});