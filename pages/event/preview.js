import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Wrapper from "../../components/wrapper/Wrapper";
import Page from "../../components/layout/Page";
import Button from "../../components/button/Button";
import { withTranslation } from "../../i18n";
import { isSafari } from "react-device-detect";

//components
import "../../styles/components/text-block.scss";
import "../../styles/components/event.scss";

import logo from "../../static/img/licor43.svg";

const EventPreview = ({ createdEvent, t }) => {
  const { name, date_time, user } = createdEvent;
  const date = new Date(date_time.replace(" ", "T"));
  const dayName = date.toLocaleDateString(undefined, { weekday: "long" });
  const day = date.getDate() + addDateSuffix(date.getDate);
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const hours = ("0" + date.getHours()).substr(-2);
  const mins = ("0" + date.getMinutes()).substr(-2);

  return (
    <Page title="Event Preview" headerType="withMenu">
      <div className="event">
        <Wrapper className="event-wrap">
          <div className="text-block">
            <h2 className="title-big">
              {t("lets-gather")}
              <span> {t("everyone")}</span>
            </h2>
            <span className="text-block__text">
              {t("invite-impossible-to-resist")}
            </span>
          </div>
          <div className="event__item" style={isSafari ? { marginTop: 5 } : {}}>
            <div className="event__head">
              <div className="event__head-img-wrap">
                <img src={logo} alt="" className="event__head-img" />
              </div>
              <span className="event-head__text">THE PERFECT HOST</span>
              <span className="event-head__time">now</span>
            </div>
            <div className="event__body">
              <span className="event__body-text event__body-text--bold">
                {user.name}
              </span>
              <span className="event__body-text event__body-text--bold">
                {t("invitation-to")} '{`${name}`}'
              </span>
              <span className="event__body-text">
                {dayName} {day} of {month} at {hours}:{mins}.
              </span>
              <span className="event__body-text">
                {t("looking-forward-to-see-you")}
              </span>
            </div>
          </div>
          <div className="event__btn-wrap">
            <a
              target="_blank"
              href={`https://wa.me/?text=https://theperfecthost.app/whatsapp/${createdEvent.whatsapp_code}`}
              className="btn btn--whatsapp"
            >
              {t("share-using-whatsapp")}
            </a>
            <Button component="link" href="/event/invites" className="btn">
              {t("select-guests")}
            </Button>
            <Button
              component="link"
              href="/event/setup"
              className="btn btn--invert"
            >
              {t("edit-event")}
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

const addDateSuffix = date => {
  switch (date) {
    case 1:
    case 21:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
};

EventPreview.getInitialProps = async () => ({
  namespacesRequired: ["event-preview"]
});

EventPreview.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  createdEvent: state.event.createdEvent
});

export default withTranslation("event-preview")(
  connect(mapStateToProps)(EventPreview)
);
