import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Header from "../header/Header";
import HeaderQuiz from "../header/HeaderQuiz";
import { ToastContainer } from "react-toastify";

// Header Types
// default - Header-small
// big - Header-big
// withMenu - Header with menu
// quiz - Header for quiz
// none = No header

const Page = ({ title, headerType, menuType, children }) => {
  let header;
  if (headerType === "big") {
    header = <Header size="2x" />;
  } else if (headerType === "withMenu") {
    header = <Header withMenu menuType={menuType} />;
  } else if (headerType === "quiz") {
    header = (
      <>
        <ToastContainer hideProgressBar style={{ color: "#000" }} />
        <HeaderQuiz />
      </>
    );
  } else if (headerType === "none") {
    header = null;
  } else {
    header = <Header />;
  }
  return (
    <div id="page">
      <Head>
        <title>{title} | Licor43</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/static/favicon.ico"
        />
        <link rel="manifest" href="/static/manifest.json" />
      </Head>

      <div className="page bgc-black">
        {header}
        {children}
      </div>
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  headerType: PropTypes.string,
  menuType: PropTypes.string
};

export default Page;
