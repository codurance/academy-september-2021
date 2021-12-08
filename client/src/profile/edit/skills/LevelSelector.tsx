import {Dropdown, DropdownItemProps} from "semantic-ui-react";
import React, {SyntheticEvent} from "react";

type Props = {
    isDisabled: boolean;
    selectedLevel?: number;
    onLevelSelected: (level: number) => void
};

export const LevelSelector: React.FC<Props> = ({isDisabled, selectedLevel, onLevelSelected}) => {
    const availableLevels = [
        {value: 1, description: 'I\'ve just started learning this'},
        {value: 2, description: 'I am able to do this without much reference material'},
        {value: 3, description: 'I could lead a pairing session on this'},
        {value: 4, description: 'I would be comfortable being a technical lead on this'},
        {value: 5, description: 'I could talk about this at a conference'}
    ];

    const updateLevel = (event: SyntheticEvent, data: DropdownItemProps) => {
        const newLevel = data.value as number;
        onLevelSelected(newLevel);
    };

    return (
        <Dropdown className="selection" placeholder='Select Level' text={selectedLevel?.toString()}
                  disabled={isDisabled}>
            <Dropdown.Menu>
                {availableLevels.map(level =>
                    <Dropdown.Item key={level.value}
                                   text={level.value}
                                   description={level.description}
                                   value={level.value}
                                   onClick={updateLevel}/>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};