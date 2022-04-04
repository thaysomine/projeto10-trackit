import { useState, useEffect, useContext } from 'react';

import UserContext from '../context/UserContext';
import trash from '../assets/trash.svg';
import styled from 'styled-components';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';


export default function Habits() {
    const [myHabits, setMyHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({
        create:false,
        name:"",
        days:[]
    });
    const {userData: {token}} = useContext(UserContext);
    const daysList = ["D", "S", "T", "Q", "Q", "S", "S"]
    const tokenValue = token;
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promisse = axios.get(URL, config);
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
                    <Div onClick={()=> {
                        setNewHabit({...newHabit, create: true})
                    }}>
                        <h2>Meus hábitos</h2>
                        <h3>+</h3>
                    </Div>
                    {renderCreateHabit(newHabit, setNewHabit, daysList, tokenValue)}
                    {myHabits.length > 0 ? renderHabits(myHabits, daysList): <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
                </Main>
                <Footer />
            </>
    )
}

function renderHabits(myHabits, daysList) {

    console.log(daysList)
    return (
        myHabits.map(habit => {
            const {id, name, days} = habit;
            console.log(days);
            return (
                <Container>
                    <Tag>
                        <Wrap>
                            <h3 key={id}>{name}</h3>
                            <Days>
                                {daysList.map(day => <div>{day}</div>)}
                            </Days>
                        </Wrap>
                        <img src={trash} alt="trash-icon" />
                    </Tag>
                </Container>
            )
        })
    )
}
function renderCreateHabit(newHabit, setNewHabit, daysList, tokenValue) {
    function sendHabit(e) {
        const config = {
            headers: {
                Authorization: `Bearer ${tokenValue}`
            }
        }
        e.preventDefault()
        setNewHabit({...newHabit, create: false})
        console.log(newHabit)
        if (newHabit.days.length !== 0) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
            const promisse = axios.post(URL, {
                name: newHabit.name,
                days: newHabit.days,
            }, config);

            promisse.then(response => {
                console.log(response);
            })
            promisse.catch(() => {
                console.log("deu erro :)");
            })
        } 
    }
    return (
        newHabit.create === true ? 
        <>
            <Tag>    
                <Wrap>
                    <form onSubmit={sendHabit}>               
                        <input type="text" placeholder="nome do hábito" required onChange={(name) => setNewHabit({...newHabit, name:name.target.value})}/>
                        <Days>
                            {daysList.map((day, id) => {
                                return (
                                    <div className={newHabit.days.includes(id) ? "checked" : ""} key={id} onClick={() => {
                                        newHabit.days.includes(id) ? setNewHabit({
                                            ...newHabit,
                                            days: newHabit.days.filter(day => day !== id)
                                        }) : setNewHabit({...newHabit, days:[...newHabit.days, id]})
                                    }} >{day}
                                    </div>)})}
                        </Days>
                        <Button>
                            <h4 onClick={()=> {
                                setNewHabit({...newHabit, create: false})
                                }}>
                                Cancelar
                            </h4>
                            <button type='submit'>Salvar</button>
                        </Button>
                    </form>   
                </Wrap>
            </Tag>
        </> : <></>
    )
}

const Main = styled.main`
    width: 100vw;
    min-width: 340px;
    height: 100vh;
    background-color: #F2F2F2;
    padding-top: 100px;
    padding-bottom: 40px;
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
    box-sizing: border-box;
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
const Container = styled.div`
    box-sizing: border-box;
`;
const Tag = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    padding: 13px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    margin-left: 18px;
    margin-right: 18px;
`;
const Wrap = styled.div`
    width: 100%;
    input {
        width: 100%;
        height: 45px;
        padding: 10px;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;

        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
    }
    p {
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }
    h3 {
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
`;
const Days = styled.div`
    display: flex;
    div {
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    margin-top: 10px;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    }
    .checked {
        background-color: #CFCFCF; 
        color: #FFFFFF;
    }
`;
const Button = styled.div`
    display: flex;
    margin-top: 29px;
    justify-content: right;
    align-items: center;

    h4{
        margin-right: 20px;
        font-size: 15.976px;
        line-height: 20px;
        color: #52B6FF;
    }
    button {
        width: 84px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #52B6FF;
        border-radius: 4.63636px;
        color: #FFFFFF;
        border: none;
    }
`;