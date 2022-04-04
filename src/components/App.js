import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Login from './Login';
import Signup from './Signup';
import Today from './Today';
import Habits from './Habits';
import Historic from './Historic';
import UserContext from '../context/UserContext';
import '../style/reset.css';
import '../style/style.css';


export default function App() {
    const [userData, setUserData] = useState({});
    const [habitsChecked, setHabitsChecked] = useState(0);
    const [calc, setCalc] = useState(0);
    console.log(userData)
    return (
        <UserContext.Provider value={{userData, setUserData, calc, setCalc, habitsChecked, setHabitsChecked}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/historic" element={<Historic />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}
