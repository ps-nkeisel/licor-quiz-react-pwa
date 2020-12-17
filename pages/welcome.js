import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Page from "../components/layout/Page";
import Button from "../components/button/Button";
import Wrapper from "../components/wrapper/Wrapper";
import Slider from "react-slick";
import ConfirmationScreen from "../components/confirmation-screen/ConfirmationScreen";
import { getEvents, selectEvent } from "../actions/eventActions";
import { sliderSettings } from "../util/slider.settings";
import Spinner from "../components/spinner/Spinner";
import { withTranslation } from "../i18n";
import { isSafari } from "react-device-detect";

import slide1 from "../static/img/quiz-home.jpg";
import homeQuizLogo from "../static/img/home-quiz.svg";
import "../styles/components/text-block.scss";
import "../styles/components/slider.scss";
import { BASE_URL } from "../util/varibales";

const Welcome = ({ auth, event, selectEvent, getEvents, language, t }) => {
  const [showConfirmationScreen, setConfirmationScreen] = useState(false);
  const closeConfirmationScreen = () => setConfirmationScreen(false);
  const [selectedEvent, setSelectedEvent] = useState("Dinner for Two");
  const { isAuthenticated, user, isLoading: authLoading } = auth;
  const { events, isLoading: eventsLoading } = event;
  useEffect(() => {
    getEvents();
  }, [language]);
  return (
    <Page title="Welcome" headerType="withMenu">
      <div className="container">
        <Wrapper>
          {authLoading || eventsLoading || !user ? (
            <Spinner />
          ) : (
            <>
              <div className="text-block">
                <h2 className="text-block__title title-big">
                  {t("welcome")}
                  <span>{user.name}</span>
                </h2>
                <span className="text-block__text">
                  {t("lets-start-with-the-basics")}
                </span>
              </div>
              <div className="slider-wrap">
                <span className="slider__title">
                  <span>{t("what")}</span>
                  {t("are-we-doing")}
                </span>
                {/* Slider */}
                <Slider
                  {...sliderSettings}
                  style={{ touchAction: "none" }}
                  className={isSafari ? "slider" : ""}
                >
                  <div className="slider__slide">
                    <Button component="link" href="/quiz/welcome">
                      <div className="slider__slide-img">
                        <img src={slide1} alt="" />
                        <img
                          src={homeQuizLogo}
                          alt=""
                          className="slider-quiz__logo"
                        />
                      </div>
                      <div
                        className="slider__slide-text-wrap"
                        style={{ padding: 10 }}
                      >
                        <h2 className="slider__slide-title">Home Quiz</h2>
                        <span
                          className="slider__slide-text"
                          style={{ color: "#000" }}
                        >
                          The most creative quiz game ever
                        </span>
                      </div>
                    </Button>
                  </div>
                  {events.map(event => {
                    const { title, description } = event;
                    const firstTwoWords =
                      title.split(" ")[0] + " " + title.split(" ")[1];
                    const thirdWord = title.split(" ")[2];
                    return (
                      <div
                        key={event.id}
                        className="slider__slide"
                        onClick={() => {
                          setSelectedEvent(title);
                          selectEvent(event);
                          setConfirmationScreen(prevState => !prevState);
                        }}
                      >
                        <div
                          className="slider__slide-img"
                          style={isSafari ? { height: 185 } : {}}
                        >
                          <img
                            src={`${BASE_URL}/storage/event-types/${event.image}`}
                            alt=""
                          />
                        </div>
                        <div
                          className="slider__slide-text-wrap"
                          style={{ padding: 10 }}
                        >
                          <h2 className="slider__slide-title">
                            {/* {firstTwoWords} <span> {thirdWord}</span> */}
                            {title}
                          </h2>
                          <span className="slider__slide-text">
                            {description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </>
          )}
        </Wrapper>
      </div>
      {showConfirmationScreen && (
        <ConfirmationScreen
          text={`Great,${selectedEvent} it is!`}
          closeConfirmationScreen={closeConfirmationScreen}
          nextPage="/event/setup"
        />
      )}
    </Page>
  );
};

Welcome.getInitialProps = async () => ({
  namespacesRequired: ["welcome", "menu"]
});

Welcome.propTypes = {
  t: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  getEvents: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event,
  language: state.language.currentLanguage
});

export default withTranslation("welcome")(
  connect(mapStateToProps, { selectEvent, getEvents })(Welcome)
);
