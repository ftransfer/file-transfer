import { Fragment } from "react";
import Head from "next/head";
import AppBar from "~/components/AppBar";
import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("~/layouts/MainLayout"), {
  ssr: false,
});

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>File Transfer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <MainLayout {...props} />
      </main>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  return {
    props: { sourceDir: query.sourceDir },
  };
}
