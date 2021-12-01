import {Header, Image} from "semantic-ui-react";
import logo from "./logo.svg";

export const Logo = () => {
    return (
        <>
            <Image src={logo} centered height={200} width={100}/>
            <Header as='h1' textAlign='center' style={{fontFamily: 'Orbitron', fontSize: '4em'}}>SkillSet</Header>
        </>
    );
};