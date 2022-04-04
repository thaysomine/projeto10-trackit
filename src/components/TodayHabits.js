
import styled from 'styled-components';
import check from '../assets/check.svg';


export default function TodayHabits(props) {
    const {myHabitsToday: { id, name, done, currentSequence, highestSequence }, checkDone} = props;
    console.log(id);

    return (
        <Container>           
            <Tag >
                <Wrap>
                    <h3>{name}</h3>
                    <p>Sequência atual: {currentSequence} dias <br></br> Seu recorde: {highestSequence} dias</p>
                </Wrap>
                <div className="checkbox" onClick={() => {console.log("eviar p api");}}>
                    <img src={check} alt="checkbox" />
                </div>                         
            </Tag>
        </Container>
    )
}

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
    .checkbox {
        width: 69px;
        height: 69px;
        background: #EBEBEB;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .check {
        background: #8FC549;
    }
    img {
        width: 35px;
        height: 28px;
    }
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