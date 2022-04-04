import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

export default function Historic() {
    return (
        <>
            <Header />
            <Main>
                <Div>
                    <h2>Histórico</h2>
                </Div>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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
    padding-left: 18px;
    padding-right: 18px;
    box-sizing: border-box;
        p {
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        margin-top: 28px;
    }
`;
const Div = styled.div`
    h2 {
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    `;