import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert";
import { validateRegisterFields } from "../../components/validation/formValidation";
import { register } from "../../actions/authActions";
import Spinner from "../../components/spinner/Spinner";
import { withTranslation } from "../../i18n";

import registerBkg from "../../static/img/register-bkg.png";
import "../../styles/components/forms.scss";
import "../../styles/components/register.scss";
import "../../styles/components/text-block.scss";

const registerBackground = {
  backgroundImage: "url(" + registerBkg + ")",
  backgroundSize: "cover"
};

const Register = ({ register, isLoading, errorMsg, currentLanguage, t }) => {
  const router = useRouter();
  const [isFormValid, setFormValid] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    tac: false,
    legit: false,
    newsletter: false,
    language: currentLanguage
  });
  const {
    name,
    email,
    password,
    confirmPassword,
    tac,
    legit,
    newsletter
  } = formData;

  // Form handling
  const onChange = e => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const resetForm = () =>
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      tac: false,
      legit: false,
      newsletter: false
    });

  // Submit form
  const onSubmit = e => {
    e.preventDefault();
    const { isValid } = validateRegisterFields(formData);
    if (!isValid) {
      setFormValid(false);
      return;
    }
    register(formData, router);
  };

  return (
    <Page title="Register">
      <div className="register register--opacity" style={registerBackground}>
        <Wrapper className="register-wrap">
          <div className="text-block">
            <h2 className="title-big mba">
              {t("welcome")}
              <span>{t("sign-up")}</span>
            </h2>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <form
              className="register-form"
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <div className="register-form__inputs">
                {(!isFormValid || errorMsg) && (
                  <Alert msg={errorMsg || "Invalid Form"} />
                )}
                <input
                  style={{ backgroundColor: "transparent" }}
                  className="input"
                  type="text"
                  placeholder={t("your-name")}
                  name="name"
                  value={name}
                  onChange={onChange}
                />
                <input
                  style={{ backgroundColor: "transparent" }}
                  className="input"
                  type="text"
                  placeholder={t("your-email")}
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                <input
                  style={{ backgroundColor: "transparent" }}
                  className="input"
                  type="password"
                  placeholder={t("set-password")}
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                <input
                  style={{ backgroundColor: "transparent" }}
                  className="input"
                  type="password"
                  placeholder={t("confirm-password")}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                />
              </div>
              <div className="checkbox__wrap">
                <label htmlFor="tac" className="checkbox__label">
                  <input
                    type="checkbox"
                    name="tac"
                    id="tac"
                    checked={tac}
                    onChange={onChange}
                    required
                  />
                  <span className="checkbox__checkmark"></span>I agree with{" "}
                  <a href="/terms-and-conditions" style={{ color: "#fff" }}>
                    <u>{"Terms and Conditions"}</u>
                  </a>
                </label>
              </div>
              <div className="checkbox__wrap">
                <label htmlFor="legit" className="checkbox__label">
                  <input
                    type="checkbox"
                    name="legit"
                    id="legit"
                    checked={legit}
                    onChange={onChange}
                  />
                  <span className="checkbox__checkmark"></span>
                  {t("consent")}
                </label>
              </div>
              <div className="checkbox__wrap">
                <label
                  htmlFor="newsletter"
                  className="checkbox__label checkbox__label--sm"
                >
                  <input
                    type="checkbox"
                    name="newsletter"
                    id="newsletter"
                    checked={newsletter}
                    onChange={onChange}
                  />
                  <span className="checkbox__checkmark"></span>
                  {t("newsletter")}
                  <b> Licor43</b>
                </label>
              </div>
              <div className="register__submit">
                <Button className="btn btn--p16">Sign Up</Button>
              </div>
            </form>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

Register.getInitialProps = () => ({
  namespacesRequired: ["register"]
});

Register.propTypes = {
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  errorMsg: state.error.msg,
  currentLanguage: state.language.currentLanguage
});

export default withTranslation("register")(
  connect(mapStateToProps, { register })(Register)
);
