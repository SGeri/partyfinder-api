import React, { useEffect } from "react";
import Head from "next/head";

import AuthenticationForm from "../src/AuthenticationForm";
import Dashboard from "../src/Dashboard";

export default function Home() {
  const [authenticated, setAuthenticated] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) setAuthenticated(true);
  });

  return (
    <>
      <Head>
        <title>PartyFinder Admin</title>
        <meta
          name="description"
          content="A PartyFinder rendezvénykereső-alkalmazás adminisztrációs felülete"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!authenticated ? (
          <AuthenticationForm login={() => setAuthenticated(true)} />
        ) : (
          <Dashboard logout={() => setAuthenticated(false)} />
        )}
      </main>
    </>
  );
}
