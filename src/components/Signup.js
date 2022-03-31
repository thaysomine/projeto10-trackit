import { NotificationContainer, NotificationManager } from 'react-notifications';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import "react-notifications/lib/notifications.css"

import logo from "../assets/logo.svg";

export default function Signup() {
    let navigate = useNavigate;
    const [userSignup, setUserSignup] = useState({
        email:"",
        name:"",
        image:"",
        password:""
    });
    const [loading, setLoading] = useState({
        load:"Cadastrar", 
        disabled:false, 
        class:"able"
    });
    let isable = loading.class;
    console.log(isable)

    function sendData(e) {
        e.preventDefault()
        setLoading({...loading, load:"carregando", disabled:true, class:"disable"})
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`;
        const promisse = axios.post(URL, userSignup);

        promisse.then(response => {
            const {data} = response;
            console.log(data);
            navigate("/")
        });
        promisse.catch(() => {
            console.log("deu erro :)");
            NotificationManager.error('Preencha todos os campos corretamente');
            setLoading({...loading, load:"carregando", disabled:false, class:"able"})
        });
    }

    return (
        <Div> <NotificationContainer />
            <img src={logo} alt="logo" />
            <form onSubmit={sendData}>
                <input className={isable} type="text" disabled={loading.disabled} placeholder="email" required onChange={(email) => setUserSignup({...userSignup, email:email.target.value})} />
                <input className={isable} type="text" disabled={loading.disabled} placeholder="senha" required onChange={(password) => setUserSignup({...userSignup, password:password.target.value})} />
                <input className={isable} type="text" disabled={loading.disabled} placeholder="nome" required onChange={(name) => setUserSignup({...userSignup, name:name.target.value})} />
                <input className={isable} type="text" disabled={loading.disabled} placeholder="foto" required onChange={(image) => setUserSignup({...userSignup, image:image.target.value})} />
                <button className={isable} disabled={loading.disabled}>{isable === "able" ? loading.load : <ThreeDots 
                    color="white" 
                    height={50} 
                    width={50}
                />}</button>
            </form>
            <Link to={`/`}>
                <p>Já tem uma conta? Faça login!</p>
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
    padding-bottom: 68px;
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