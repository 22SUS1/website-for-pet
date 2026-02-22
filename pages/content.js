import Head from "next/head";
import React from "react";
import Link from "next/link";

const ContentPage = () => {
  return (
    <div>
      <Head>
        <title>Контент</title>
      </Head>
      <h1>Страница контента</h1>
      <p>Здесь была карта — теперь удалена для совместимости с React 19.</p>
      <Link href="/">На главную</Link>
    </div>
  );
};

export default ContentPage;