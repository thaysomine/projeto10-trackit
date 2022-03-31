import logo from "../assets/logo.svg";
import styled from 'styled-components';
import { Link } from "react-router-dom"

export default function Registrer() {
    return (
        <Div>  
            <img src={logo} alt="logo" />
            <form>
                <input type="text" placeholder="email" required />
                <input type="text" placeholder="senha" required />
                <input type="text" placeholder="nome" required />
                <input type="text" placeholder="foto" required />
                <button>Cadastrar</button>
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