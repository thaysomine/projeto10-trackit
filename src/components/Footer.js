import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styled from 'styled-components'

export default function Footer() {
    return (
        <Div>
            <p>Hábitos</p>
            <div>
                <CircularProgressbar
                    value={50}
                    text={"Hoje"}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                    })}
                />
            </div>
            <p>Histórico</p>
        </Div>
    )
}

const Div = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    position: fixed;
    bottom: 0;
    left:0;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    padding-left: 18px;
    padding-right:18px;
    box-sizing: border-box;
    P {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
    div {
        width: 91px;
        height: 91px;
        position: absolute;
        top: -30px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
    }
`;