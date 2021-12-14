import React, {SyntheticEvent} from "react";
import {Dropdown, DropdownItemProps} from "semantic-ui-react";
import {locations} from "./ProfileLocation";

type Props = {
    location: string;
    onLocationSelected: (location: string) => void;
};

export const LocationSelector: React.FC<Props> = ({location, onLocationSelected}: Props) => {
    const updateLocation = (event: SyntheticEvent, data: DropdownItemProps) => {
        const newLocation = data.value as string;
        onLocationSelected(newLocation);
    };

    return (
        <Dropdown className="selection" placeholder='Select Location' text={location}>
            <Dropdown.Menu>
                {locations.map(location =>
                    <Dropdown.Item key={location} text={location} value={location} onClick={updateLocation}/>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};