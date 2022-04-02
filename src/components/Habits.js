import { useState, useEffect } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function Habits() {
    const [myHabits, setMyHabits] = useState([]);

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promisse = axios.get(URL);
        promisse.then(response => {
            const {data} = response;
            console.log(data);
            setMyHabits(data);
        });
        promisse.catch(err => console.log(err.response));
    }, []);

    return (
            <>
                <Header />
                <Main>
                    <Div>
                        <h2>Meus hábitos</h2>
                        <h3>+</h3>
                    </Div>
                    {myHabits.length > 0 
                    ? 
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
                </Main>
                <Footer />
            </>
    )
}

const Main = styled.main`
    width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
    padding-top: 100px;
    padding-bottom: 100px;
    p {
        padding-left: 18px;
        padding-right: 18px;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;
const Div = styled.div`
    padding-left: 18px;
    padding-right: 18px;
    display: flex;
    justify-content: space-between;
    h2 {
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    h3 {
        width: 40px;
        height: 35px;
        box-sizing: border-box;
        border-radius: 4.63636px;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        color: #FFFFFF;
        margin-bottom: 28px;
        text-align: center;
        background-color: #52B6FF;
    }
`;