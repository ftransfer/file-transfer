import Head from "next/head";
import styles from "../styles/Home.module.css";
import fs from "fs";
import { useState, useEffect } from "react";

export default function Home(props) {
  const [files, setFiles] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>File Transfer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>THIS IS A CLIENT VIEW</h1>
        <ol>
          {props.files.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ol>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let files = fs.readdirSync(query.sourceDir);

  return {
    props: { files },
  };
}
