import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Today from './components/Today';

import './style/reset.css';
import './style/style.css';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/today" element={<Today />} />
            </Routes>
        </BrowserRouter>
    );
}

const app = App();
const elemento = document.querySelector(".root");
ReactDOM.render(app, elemento);