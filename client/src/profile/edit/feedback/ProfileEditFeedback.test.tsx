import {act, render, screen} from "@testing-library/react";
import {ProfileEditFeedback} from "./ProfileEditFeedback";
import {ProfileEditState} from "../ProfileEditState";

jest.spyOn(global, 'setTimeout');

describe('profile edit feedback should', () => {
    test('clear non first time profile creation feedback after 5 seconds', async () => {
        jest.useFakeTimers();
        render(<ProfileEditFeedback profileEditState={ProfileEditState.PROFILE_SAVED} />);

        act(() => {
            jest.runAllTimers();
        });
        
        expect(await screen.queryByText('Profile Saved')).not.toBeInTheDocument();
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
    });

    test('does not clear first time profile creation feedback after 5 seconds', async () => {
        jest.useFakeTimers();
        render(<ProfileEditFeedback profileEditState={ProfileEditState.PROFILE_NOT_CREATED} />);

        act(() => {
            jest.runAllTimers();
        });

        expect(await screen.queryByText('It looks like this is your first time creating a profile')).toBeInTheDocument();
        expect(setTimeout).not.toHaveBeenCalledWith(expect.any(Function), 5000);
    });
});