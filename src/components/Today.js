import styled from 'styled-components'
import Header from './Header';
import Footer from './Footer';

import check from '../assets/checkbox.svg';

export default function Today() {
    return (
        <>
            <Header />
            <Main>
                <Div>
                    <h2>Segunda, 17/05</h2>
                    <p>Nenhum hábito concluido ainda</p>
                </Div>
                <Container>
                    <Tag>
                        <Wrap>
                            <h3>Ler 1 capítulo de livro</h3>
                            <p>Sequência atual: 3 dias <br></br> Seu recorde: 5 dias</p>
                        </Wrap>
                        <img src={check} alt="checkbox" />
                    </Tag>
                    <Tag>
                        <Wrap>
                            <h3>Ler 1 capítulo de livro</h3>
                            <p>Sequência atual: 3 dias <br></br> Seu recorde: 5 dias</p>
                        </Wrap>
                        <img src={check} alt="checkbox" />
                    </Tag>
                    <Tag>
                        <Wrap>
                            <h3>Ler 1 capítulo de livro</h3>
                            <p>Sequência atual: 3 dias <br></br> Seu recorde: 5 dias</p>
                        </Wrap>
                        <img src={check} alt="checkbox" />
                    </Tag>
                    <Tag>
                        <Wrap>
                            <h3>Ler 1 capítulo de livro</h3>
                            <p>Sequência atual: 3 dias <br></br> Seu recorde: 5 dias</p>
                        </Wrap>
                        <img src={check} alt="checkbox" />
                    </Tag>
                </Container>
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
    img {
        width: 69px;
        height: 69px;
    }
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
`;
const Container = styled.div`
    padding-left: 18px;
    padding-right: 18px;
`;
const Tag = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    padding: 13px;
    margin-bottom: 10px;
    border-radius: 5px;
`;
const Wrap = styled.div`
    h3 {
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    p {
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }
`;