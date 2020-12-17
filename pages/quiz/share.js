import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Page from "../../components/layout/Page";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/button/Button";
import { connectSocket } from "../../actions/echoActions";
import { withTranslation } from "../../i18n";

//components
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/forms.scss";
import "../../styles/components/quiz-share.scss";

const QuizShare = ({ auth, quiz, echo, connectSocket, t }) => {
  const router = useRouter();
  const { code } = quiz;
  // Initialize Echo
  useEffect(() => {
    if (auth.token && echo.status !== "CONNECTED") {
      connectSocket(code, auth.user.name, router);
    }
  }, [auth.token]);
  return (
    <Page title="Quiz - Share" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div className="text-block">
            <h2 className="text-block__title title-big">
              {t("lets-set-up")}
              <span>{t("the-basics")}</span>
            </h2>
            <div className="quiz-share">
              <div className="quiz-share__code">
                <span className="quiz-share__code-number">{code[0]}</span>
                <span className="quiz-share__code-number">{code[1]}</span>
                <span className="quiz-share__code-number">{code[2]}</span>
                <span className="quiz-share__code-number">{code[3]}</span>
              </div>
              <div className="quiz-share__text">
                <span>{t("ask-your-friends-to-visit")}</span>
                <a href="#">Licor43.com/HomeQuiz</a>
                <span>{t("and-use-the-code-above")}</span>
                <span className="quiz-share__text--status">
                  {echo.users.length === 1 ? (
                    <span>{t("waiting-for-players")}</span>
                  ) : (
                    <span>{t("ready-to-play")}</span>
                  )}
                </span>
              </div>
            </div>
            <div className="btn-wrapper">
              <a
                target="_blank"
                href={`https://wa.me/?text=https://theperfecthost.app/quiz/join code: ${code}`}
                className="btn btn--whatsapp"
              >
                {t("share-using-whatsapp")}
              </a>
              {echo.users.length > 1 && (
                <Button
                  component="link"
                  href="/quiz/categories"
                  className="btn"
                >
                  {t("let-the-game-begin")}
                </Button>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

QuizShare.getInitialProps = async () => ({
  namespacesRequired: ["quiz-share"]
});

QuizShare.propTypes = {
  auth: PropTypes.object.isRequired,
  quiz: PropTypes.object.isRequired,
  echo: PropTypes.object.isRequired,
  connectSocket: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.quiz,
  echo: state.echo
});

export default withTranslation("quiz-share")(
  connect(mapStateToProps, { connectSocket })(QuizShare)
);
