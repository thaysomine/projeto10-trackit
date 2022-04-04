import { useContext } from 'react';

import styled from 'styled-components';
import UserContext from '../context/UserContext';

export default function Header() {
    const {userData: {image}} = useContext(UserContext);
    return (
        <Div>
            <h1>Trackit</h1>
            <img src={image} alt="teste" />
        </Div>
    )
}

const Div = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    position: fixed;
    top: 0;
    left:0;
    justify-content: space-between;
    align-items: center;
    background-color: #126BA5;
    padding-left: 18px;
    padding-right:18px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
    h1 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img {
        width: 51px;
        height: 51px;
        background: url(image.png);
        border-radius: 98.5px;
    }
`;