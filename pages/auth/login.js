import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert";
import { validateInputFields } from "../../components/validation/formValidation";
import { login } from "../../actions/authActions";
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

const Login = ({ login, isLoading, errorMsg, t }) => {
  const router = useRouter();
  const [isFormValid, setFormValid] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  // Reseting password field when authentication fails
  useEffect(() => {
    if (errorMsg) {
      setFormData(prevState => ({ ...prevState, password: "" }));
    }
  }, [errorMsg]);

  // Form handling
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const onSubmit = e => {
    e.preventDefault();
    const { isValid } = validateInputFields(formData);
    if (!isValid) {
      setFormValid(false);
      return;
    }
    login(formData, router);
  };
  return (
    <Page title="Login">
      <div className="register register--opacity" style={registerBackground}>
        <Wrapper className="register-wrap">
          <div className="text-block">
            <h2 className="title-big mba">
              {t("welcome")}
              <span>{t("sign-in")}</span>
            </h2>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <form
              className="sign-in-form"
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <div className="sign-in-form__wrap">
                {(!isFormValid || errorMsg) && (
                  <Alert msg={errorMsg || "Invalid Form"} />
                )}
                <input
                  className="input input--border-bottom"
                  type="email"
                  placeholder={t("your-email")}
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                <input
                  className="input input--border-bottom"
                  style={{ marginBottom: 30 }}
                  type="password"
                  placeholder={t("your-password")}
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="register__submit">
                <Button className="btn btn--invert btn--p16">
                  {t("sign-in")}
                </Button>
              </div>
            </form>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

Login.getInitialProps = async () => ({
  namespacesRequired: ["login"]
});

Login.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  errorMsg: state.error.msg
});

export default withTranslation("login")(
  connect(mapStateToProps, { login })(Login)
);
