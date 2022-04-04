import { useState, useEffect, useContext } from "react";

import UserContext from "../context/UserContext";
import TodayHabits from "./TodayHabits";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";


export default function Today() {
    require("dayjs/locale/pt-br")
    dayjs.locale("pt-br")
    let today = dayjs().format("dddd, DD/MM").replace("-feira", "")
    today = today[0].toUpperCase() + today.slice(1) 

    const [myHabitsToday, setMyHabitsToday] = useState([]);
    const [concluded, setConcluded] = useState(0)
    const {userData: { token }} = useContext(UserContext);

    console.log(token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    
    useEffect(() => {
        const URL =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promisse = axios.get(URL, config);
        promisse.then(({ data }) => {
            console.log(data)
            setMyHabitsToday(data);
            console.log(myHabitsToday);
            let i = 0
            data.map(habit => {if (habit.done) i++})
            setConcluded(i)
        })
        promisse.catch((err) => console.log(err.response));
    }, []);

    function checkDone(id, done) {
        console.log(id);
        console.log(done);
        if (!done) {
            console.log(token);
            console.log(id);
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
            const promisse = axios.post(URL, "", config);
            promisse.then(()=> {
                let setupHabits = myHabitsToday.map(habit => {
                    if (habit.id === id) {
                        habit.done = !habit.done
                        habit.currentSequence++
                        if (habit.currentSequence > habit.highestSequence)
                            habit.highestSequence = habit.currentSequence
                    }
                    return habit
                })
                setMyHabitsToday(setupHabits)
                setConcluded(concluded + 1)
            })
            promisse.catch((err) => console.log(err));
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
            const promisse = axios.post(URL, "", config);
            promisse.then(() => {
                let setupHabits = myHabitsToday.map(habit => {
                    if (habit.id === id) {
                        habit.done = !habit.done
                        habit.currentSequence--
                        habit.highestSequence--
                        if (habit.currentSequence < 0)
                            habit.currentSequence = 0
                    }
                    return habit
                })
                setMyHabitsToday(setupHabits)
                setConcluded(concluded - 1)
            });
            promisse.catch((err) => console.log(err));
        }
    }

    return (
        <>
            <Header />
            <Main>
                <Div>
                    <h2>{today}</h2>
                    {concluded === 0 ? 
                        <p>Nenhum hábito concluido ainda</p>
                        : 
                        <p className='concluded'>67% dos hábitos concluídos</p>
                    }
                </Div>
                <>
                    {myHabitsToday 
                        ? myHabitsToday.map(habit => (
                            <TodayHabits 
                            passHabit={habit}
                            myHabitsToday={myHabitsToday}
                            checkDone={checkDone}
                            key={habit.id}
                            />
                        ))
                    : ""}
                </>
            </Main>
            <Footer />
        </>
    );
}

const Main = styled.main`
    width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
    padding-top: 100px;
    padding-bottom: 100px;
`;
const Div = styled.div`
    padding-left: 18px;
    padding-right: 18px;
    h2 {
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    p {
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
        margin-bottom: 28px;
    }
    .concluded {
        color: #8FC549;
        font-size: 17.976px;
        line-height: 22px;
    }
`;