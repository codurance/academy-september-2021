import {render, screen} from "@testing-library/react";
import React from "react";
import {ProfileCard} from "./ProfileCard"

describe('Profile card', () => {
    it('should display the name, role, display picture', () => {

        render(<ProfileCard name={'Alex Howson'} role={'Principal Craftsperson'}/>)

        expect(screen.getByText('Alex Howson')).toBeInTheDocument();
        expect(screen.getByText('Principal Craftsperson')).toBeInTheDocument();
        expect(screen.getByAltText('User profile: Alex Howson')).toBeInTheDocument();
    });
})