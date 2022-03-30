import styled from 'styled-components'
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import logo from '../assets/logo.svg';

export default function Login() {
    const [userLogin, setUserLogin] = useState({email:"", password:""});
    
    function sendData(e) {
        e.preventDefault()
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`;
        const promisse = axios.post(URL, userLogin);
        promisse.then(response => {
            console.log(response);
        })
        promisse.catch(error => {
            console.log(error);
            console.log("deu erro :)");
        })
    }

    return (
        <Div>  
            <img src={logo} alt="logo" />
            <form onSubmit={sendData}>
                <input type="text" placeholder="email" required onChange={(email) => setUserLogin({...userLogin, email:email.target.value})}/>
                <input type="text" placeholder="senha" required onChange={(password) => setUserLogin({...userLogin, password:password.target.value})}/>
                <button>Entrar</button>
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
        text-align: center;
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
`;
