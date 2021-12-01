import {ReactNode, useLayoutEffect, useState} from "react";
import {History} from "history";
import {Router} from "react-router-dom";

type Props = {
    children?: ReactNode;
    history: History;
};

export const BrowserRouter = ({children, history}: Props) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            children={children} // eslint-disable-line react/no-children-prop
            location={state.location}
            navigationType={state.action}
            navigator={history}/>
    );
};