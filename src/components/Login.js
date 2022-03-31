import styled from 'styled-components'
import { ThreeDots } from 'react-loader-spinner';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "react-notifications/lib/notifications.css"
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import logo from '../assets/logo.svg';

export default function Login() {
    const [userLogin, setUserLogin] = useState({email:"", password:""});
    const [loading, setLoading] = useState({load:"Entrar", disabled:false, class:"able"});
    let isable = loading.class;
    console.log(isable)

    function sendData(e) {
        e.preventDefault()
        setLoading({...loading, load:"carregando", disabled:true, class:"disable"})
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`;
        const promisse = axios.post(URL, userLogin);

        promisse.then(response => {
            console.log(response);
        })
        promisse.catch(() => {
            console.log("deu erro :)");
            NotificationManager.error('Usuario e/ou senha incorreto(s)');
        })
    }

    return (
        <Div> <NotificationContainer /> 
            <img src={logo} alt="logo" />
            <form onSubmit={sendData}>
                <input className={isable} type="text" placeholder="email" disabled={loading.disabled} required onChange={(email) => setUserLogin({...userLogin, email:email.target.value})}/>
                <input className={isable} type="password" placeholder="senha" disabled={loading.disabled} required onChange={(password) => setUserLogin({...userLogin, password:password.target.value})}/>
                <button className={isable} disabled={loading.disabled}>{isable === "able" ? loading.load : <ThreeDots 
                    color="white" 
                    height={50} 
                    width={50}
                />}</button>
            </form>
            <Link to={`/registrer`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
            
        </Div>     
    )
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 68px;
    img {
        width: 180px;
        height: auto;
        margin-bottom: 32px;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    input {
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 6px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
    }
    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border-style: none;
        margin-bottom: 25px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF; 
    }  
    p {
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-decoration-line: underline;
        color: #52B6FF;
    }
    .disable {
        opacity: 0.7;
    }
`;
