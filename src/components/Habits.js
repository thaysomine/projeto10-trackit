import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";

import "react-notifications/lib/notifications.css";
import UserContext from "../context/UserContext";
import trash from "../assets/trash.svg";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function Habits() {
  const [loading, setLoading] = useState({
    load: "Salvar",
    disabled: false,
    class: "able",
  });
  const [myHabits, setMyHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    create: false,
    name: "",
    days: [],
  });
  const {
    userData: { token },
  } = useContext(UserContext);
  const daysList = ["D", "S", "T", "Q", "Q", "S", "S"];
  console.log(token);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const promisse = axios.get(URL, config);
    promisse.then((response) => {
      const { data } = response;
      setMyHabits(data);
    });
    promisse.catch((err) => console.log(err.response));
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Div
          onClick={() => {
            setNewHabit({ ...newHabit, create: true });
          }}
        >
          <h2>Meus hábitos</h2>
          <h3>+</h3>
        </Div>
        {renderCreateHabit(
          myHabits,
          setMyHabits,
          newHabit,
          setNewHabit,
          daysList,
          token,
          loading,
          setLoading
        )}
        {myHabits.length > 0 ? (
          renderHabits(myHabits, setMyHabits, token)
        ) : (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )}
      </Main>
      <Footer />
    </>
  );
}

function renderHabits(myHabits, setMyHabits, token) {
  const daysList = [
    { name: "D", place: 0 },
    { name: "S", place: 1 },
    { name: "T", place: 2 },
    { name: "Q", place: 3 },
    { name: "Q", place: 4 },
    { name: "S", place: 5 },
    { name: "S", place: 6 },
  ];
  return myHabits.map((habit) => {
    const { id, name, days } = habit;
    return (
      <Container key={id}>
        <Tag>
          <Wrap>
            <h3>{name}</h3>
            <Days>
              {daysList.map(({ name, place }, id) => {
                return (
                  <div
                    key={id}
                    className={days.includes(place) ? "checked" : ""}
                  >
                    {name}
                  </div>
                );
              })}
            </Days>
          </Wrap>
          <img
            key={id}
            src={trash}
            alt="trash-icon"
            onClick={() => {
              let confirmAction = window.confirm("Excluir hábito?");
              if (confirmAction) {
                console.log(id);
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
                const promisse = axios.delete(URL, config);
                promisse.then(() => {
                  setMyHabits(myHabits.filter((e) => e.id !== id));
                });
              }
            }}
          />
        </Tag>
      </Container>
    );
  });
}
function renderCreateHabit(
  myHabits,
  setMyHabits,
  newHabit,
  setNewHabit,
  daysList,
  token,
  loading,
  setLoading
) {
  function sendHabit(e) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    e.preventDefault();
    setLoading({
      ...loading,
      load: "carregando",
      disabled: true,
      class: "disable",
    });
    if (newHabit.days.length !== 0) {
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
      const promisse = axios.post(
        URL,
        {
          name: newHabit.name,
          days: newHabit.days,
        },
        config
      );

      promisse.then((response) => {
        console.log(response.data);
        setNewHabit({ create: false, name: "", days: [] });
        setLoading({
          ...loading,
          load: "Salvar",
          disabled: false,
          class: "able",
        });
        setMyHabits([...myHabits, response.data]);
      });
      promisse.catch(() => {
        console.log("deu erro :)");
        NotificationManager.error("Preencha os dados corretamente!");
        setLoading({
          ...loading,
          load: "Salvar",
          disabled: false,
          class: "able",
        });
      });
    }
  }
  return newHabit.create === true ? (
    <>
      <Tag>
        {" "}
        <NotificationContainer />
        <Wrap className={loading.class}>
          <form onSubmit={sendHabit}>
            <input
              disabled={loading.disabled}
              type="text"
              value={newHabit.name}
              placeholder="nome do hábito"
              required
              onChange={(name) =>
                setNewHabit({ ...newHabit, name: name.target.value })
              }
            />
            <Days>
              {daysList.map((day, id) => {
                return (
                  <div
                    disabled={loading.disabled}
                    className={newHabit.days.includes(id) ? "checked" : ""}
                    key={id}
                    onClick={() => {
                      loading.class === "able"
                        ? newHabit.days.includes(id)
                          ? setNewHabit({
                              ...newHabit,
                              days: newHabit.days.filter((day) => day !== id),
                            })
                          : setNewHabit({
                              ...newHabit,
                              days: [...newHabit.days, id],
                            })
                        : console.log("oi");
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </Days>
            <Button>
              <h4
                onClick={() => {
                  setNewHabit({ ...newHabit, create: false });
                }}
              >
                Cancelar
              </h4>
              <button disabled={loading.disabled} type="submit">
                {loading.class === "able" ? (
                  loading.load
                ) : (
                  <ThreeDots color="white" height={50} width={50} />
                )}
              </button>
            </Button>
          </form>
        </Wrap>
      </Tag>
    </>
  ) : (
    <></>
  );
}

const Main = styled.main`
  width: 100%;
  min-width: 340px;
  height: calc(100vh - 161px);
  background-color: #f2f2f2;
  margin-top: 70px;
  padding-top: 22px;
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
  width: 100%;
  height: auto;
  padding-left: 18px;
  padding-right: 18px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  h2 {
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  h3 {
    width: 40px;
    height: 35px;
    box-sizing: border-box;
    border-radius: 4.63636px;
    font-weight: 400;
    font-size: 26.976px;
    line-height: 34px;
    color: #ffffff;
    margin-bottom: 28px;
    text-align: center;
    background-color: #52b6ff;
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
  background-color: #ffffff;
  padding: 13px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 18px;
  margin-right: 18px;
  .disable {
    opacity: 0.7;
  }
  img {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
const Wrap = styled.div`
  width: 100%;
  word-break: break-all;
  input {
    width: 100%;
    height: 45px;
    padding: 10px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;

    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
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
    background: #ffffff;
    border: 1px solid #d5d5d5;
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
    color: #dbdbdb;
  }
  .checked {
    background-color: #cfcfcf;
    color: #ffffff;
  }
`;
const Button = styled.div`
  display: flex;
  margin-top: 29px;
  justify-content: right;
  align-items: center;

  h4 {
    margin-right: 20px;
    font-size: 15.976px;
    line-height: 20px;
    color: #52b6ff;
  }
  button {
    width: 84px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52b6ff;
    border-radius: 4.63636px;
    color: #ffffff;
    border: none;
  }
`;
