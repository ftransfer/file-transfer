import { Fragment } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import AppBar from "~/components/AppBar";
// import MainLayout from "~/layouts/MainLayout";
import dynamic from "next/dynamic";
// import NoSsr from "@material-ui/core/NoSsr";

import { readDirTree } from "../lib/tree-directory";

const MainLayout = dynamic(() => import("~/layouts/MainLayout"), {
  ssr: false,
});

export default function Home(props) {
  const [files, setFiles] = useState([]);

  return (
    <Fragment>
      <Head>
        <title>File Transfer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainLayout {...props} />
        {/* <AppBar />
        <h1>THIS IS A CLIENT VIEW</h1>
        <ol>
          {props.files.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ol> */}
      </main>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let files = fs.readdirSync(query.sourceDir);
  const dirTree = readDirTree(fs, path, query.sourceDir);
  console.log(dirTree);

  return {
    props: { files, dirTree },
  };
}
