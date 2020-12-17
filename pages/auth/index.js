import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Router from "next/router";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/button/Button";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { facebookLogin } from "../../actions/authActions";

import { withTranslation } from "../../i18n";

import welcomeBg from "../../static/img/welcome-bg.png";
import facebookLogo from "../../static/img/facebook.svg";
import "../../styles/components/register.scss";

const Auth = ({ t, facebookLogin, currentLanguage }) => {
  const router = useRouter();

  const responseFacebook = response => {
    response.language = currentLanguage;
    facebookLogin(response, router);
  };

  return (
    <Page title="Auth" headerType="big">
      <Wrapper className="register-wrap">
        <img src={welcomeBg} alt="Welcome screen" style={{ height: "62vh" }} />
        {/* <div className="register-bg"></div> */}
        <div className="register__btn-wrap">
          <Button
            component="link"
            href="/auth/register"
            className="btn btn--sign-up"
          >
            {t("sign-up")}
          </Button>
          <FacebookLogin
            appId="135541473969036"
            fields="name, email"
            callback={responseFacebook}
            render={renderProps => (
              <Button
                className="btn btn--facebook"
                onClick={renderProps.onClick}
              >
                <img src={facebookLogo} alt="facebook logo" />
                <span className="btn--facebook-text">{t("continue-with")}</span>
              </Button>
            )}
          />
          <Button
            component="link"
            href="/auth/login"
            className="btn btn--invert"
          >
            {t("sign-in")}
          </Button>
        </div>
      </Wrapper>
    </Page>
  );
};

Auth.getInitialProps = async ({ store }) => {
  // If user is authenticated, redirect to /welcome
  if (store.getState().auth.isAuthenticated) {
    Router.push("/welcome");
  }
  return {
    namespacesRequired: ["auth"]
  };
};

Auth.propTypes = {
  t: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentLanguage: state.language.currentLanguage
});

export default withTranslation("auth")(
  connect(mapStateToProps, { facebookLogin })(Auth)
);
