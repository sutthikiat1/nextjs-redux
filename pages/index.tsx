import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import withRedux from "next-redux-wrapper";

const Home = () => {
  const counter = useSelector((store) => store.counter);
  const dispatch = useDispatch();

  console.log(counter);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Example Imprement Redux with{" "}
          <a href="https://nextjs.org">Next.js! </a>
        </h1>
        <h4 style={{ color: "rgb(115, 132, 147)", fontSize: 12 }}>
          redux , next-redux-wrapper , redux-persist , styled-component
        </h4>

        <p className={styles.description}>Count : {counter?.count || "0"}</p>

        <ContainerButton>
          <ButtonInCreedment
            onClick={() => dispatch({ type: "incrementCount", payload: 5 })}
          >
            Increment
          </ButtonInCreedment>
          <ButtonReset onClick={() => dispatch({ type: "resetCount" })}>
            Reset
          </ButtonReset>
        </ContainerButton>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

const ContainerButton = styled.div`
  display: flex;
  width: 100%;
`;
const ButtonInCreedment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  margin: 10px;
  background: rgb(214, 236, 255);
  border: 1px solid rgb(0, 137, 255);
  color: rgb(0, 137, 255);
  font-size: 16px;
  border-radius: 50px;
  cursor: pointer;
`;

const ButtonReset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  margin: 10px;
  background: rgb(252, 244, 214);
  border: 1px solid rgb(242, 201, 76);
  color: rgb(242, 201, 76);
  font-size: 16px;
  border-radius: 50px;
  cursor: pointer;
`;
