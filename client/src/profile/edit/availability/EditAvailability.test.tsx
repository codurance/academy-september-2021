import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ProfileAvailability} from "skillset";
import {EditAvailability} from "./EditAvailability";

describe('edit availability should', () => {
    let availability: ProfileAvailability;
    const updateAvailability = (updatedAvailability: ProfileAvailability) => {
        availability = updatedAvailability;
    };

    it('hide client when available', async () => {
        availability = {
            isAvailable: true,
            client: undefined
        };
        renderEditAvailability();

        expect(await screen.queryByText('Current Client')).not.toBeInTheDocument();
        expect(await screen.queryByText('Best Company')).not.toBeInTheDocument();
    });

    it('update availability with no client when available', () => {
        availability = {
            isAvailable: false,
            client: 'Client'
        };
        renderEditAvailability();

        toggleAvailability();

        expect(availability).toEqual({
            isAvailable: true,
            client: undefined
        });
    });

    it('update availability with client when not available', async () => {
        availability = {
            isAvailable: false,
            client: 'Best Compan'
        };
        renderEditAvailability();

        await inputText('Current Client', 'y');

        expect(availability).toEqual({
            isAvailable: false,
            client: 'Best Company'
        });
    });

    const renderEditAvailability = () => {
        render(
            <EditAvailability availability={availability} onAvailabilityUpdated={updateAvailability}/>
        );
    };

    const toggleAvailability = () => {
        const label = screen.getByText('I am available to be placed onto a client');
        const checkbox = label.parentElement;
        userEvent.click(checkbox!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    };

    const inputText = async (label: string, value: string) => {
        const labelElement = await screen.findByText(label);
        const field = labelElement.parentElement;
        const input = field?.querySelector('input');
        await userEvent.type(input!, value); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    };

});