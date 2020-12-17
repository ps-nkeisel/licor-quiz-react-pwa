import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Page from "../components/layout/Page";
import Wrapper from "../components/wrapper/Wrapper";
import Button from "../components/button/Button";
import { setLanguage } from "../actions/languageActions";
import { i18n, withTranslation } from "../i18n";

import welcomeBg from "../static/img/welcome-bg.png";
import flagUk from "../static/img/flag-uk.png";
import flagSpain from "../static/img/flag-spain.png";

import "../styles/components/home.scss";

const Home = ({ auth: { isAuthenticated }, setLanguage }) => {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) router.push("/quiz/rules");
  }, []);
  return (
    <Page title="Home" headerType="big">
      <Wrapper size={120}>
        <img src={welcomeBg} alt="Welcome screen" style={{ height: "62vh" }} />
        {/* <div className="welcome-layout"></div> */}
        <div className="footer">
          <Button
            component="link"
            href="/auth"
            onClick={() => {
              i18n.changeLanguage("es");
              setLanguage("spanish");
            }}
          >
            <img src={flagSpain} alt="spain" />
          </Button>
          <Button
            component="link"
            href="/auth"
            onClick={() => {
              i18n.changeLanguage("en");
              setLanguage("english");
            }}
          >
            <img src={flagUk} alt="uk" />
          </Button>
        </div>
      </Wrapper>
    </Page>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

Home.getInitialProps = async () => ({
  namespacesRequired: ["common"]
});

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired
};

export default withTranslation("common")(
  connect(mapStateToProps, { setLanguage })(Home)
);
