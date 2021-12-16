import {Profile} from "skillset";
import {render, screen} from "@testing-library/react";
import {ProfileModal} from "./ProfileModal";
import React from "react";

jest.mock("react-markdown", () => (props: { children: unknown }) => { // eslint-disable-line react/display-name
    return <>{props.children}</>;
});

describe('profile modal should', () => {
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

    test('does not show modal when configured to not be visible', async () => {
        render(<ProfileModal profile={profile} isVisible={false} onModalClosed={() => {/* do nothing */
        }}/>);

        expect(await screen.queryByText('Jordan Steele')).not.toBeInTheDocument();
    });

    test("display a consultant's profile information", () => {
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
        expect(screen.getByText('Notes')).toBeInTheDocument();
        expect(screen.getByText('my notes')).toBeInTheDocument();
    });

    test('display available when profile indicates available', () => {
        profile.availability = {
            isAvailable: true
        };

        render(<ProfileModal profile={profile} isVisible={true} onModalClosed={() => {/* do nothing */
        }}/>);

        expect(screen.getByText('Available')).toBeInTheDocument();
    });

    test('does not show notes when notes have not been added yet', async () => {
        profile.notes = undefined;

        render(<ProfileModal profile={profile} isVisible={true} onModalClosed={() => {/* do nothing */
        }}/>);

        expect(await screen.queryByText('Notes')).not.toBeInTheDocument();
    });

    test('triggers closed handler when close button pressed', () => {
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