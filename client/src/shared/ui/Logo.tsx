import {Header, Image} from "semantic-ui-react";
import logo from "./logo.svg";
import React from "react";

export const Logo: React.FC = () => {
    return (
        <>
            <Image src={logo} centered height={200} width={100}/>
            <Header as='h1' textAlign='center' style={{fontFamily: 'Orbitron', fontSize: '4em'}}>SkillSet</Header>
        </>
    );
};