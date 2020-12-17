import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import Alert from "../../components/alert/Alert";
import Wrapper from "../../components/wrapper/Wrapper";
import Page from "../../components/layout/Page";
import Button from "../../components/button/Button";
import { createEvent } from "../../actions/eventActions";
import { withTranslation } from "../../i18n";
import { isSafari } from "react-device-detect";

import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/forms.scss";
import Spinner from "../../components/spinner/Spinner";
import "../../styles/components/text-block.scss";
import "../../styles/components/slider.scss";
import "../../styles/components/event.scss";

//images
import calendarIcon from "../../static/img/Calendar.svg";
import clockIcon from "../../static/img/Clock.svg";
import markIcon from "../../static/img/Mark.svg";

// function useToken(state) {
//   return  useSelector(state => state.auth.token)
// }

const EventSetup = ({
  events: { selectedEvent, isLoading },
  createEvent,
  t
}) => {
  // const token = useToken()

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: selectedEvent.title || "",
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      19,
      0
    ),
    startTime: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      19,
      0
    ),
    location: ""
  });
  const [locationError, setLocationError] = useState(null);
  const { name, startDate, startTime, location } = formData;

  const setStartDate = date => setFormData({ ...formData, startDate: date });
  const setStartTime = date => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const newDate = new Date(year, month, day, hours, minutes);
    setFormData({
      ...formData,
      startDate: newDate,
      startTime: newDate
    });
  };
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createEvent(formData, selectedEvent, router);

    // Validate input fields
    if (location === "") {
      setLocationError("Location is required");
    } else {
      createEvent(formData, selectedEvent, router);
      setLocationError(null);
    }
  };
  return (
    <Page title="Event Setup" headerType="withMenu">
      <div className="event">
        <Wrapper className="event-wrap">
          <div className="text-block">
            <h2 className="text-block__title title-big">
              {t("when-everything")}
              <span> {t("will-happen")}</span>
            </h2>
            <span
              className="text-block__text"
              style={!isSafari ? { marginBottom: 30 } : {}}
            >
              {t("lets-setup-the-event")}
            </span>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={onSubmit} className="event-form" autoComplete="off">
              <div
                className="event-form__inputs"
                style={!isSafari ? { marginBottom: "30%" } : {}}
              >
                {locationError && <Alert msg={locationError} />}
                <div className="event-form__input-wrap">
                  <input
                    className="input input--white input--mb-25"
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Name for the Event"
                  />
                </div>
                <div className="event-form__input-wrap input-calendar">
                  <img src={calendarIcon} alt="" className="input-icon" />
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      name="startDate"
                      dateFormat="E, d MMM"
                    />
                  </div>
                </div>
                <div className="event-form__input-wrap input-clock">
                  <img src={clockIcon} alt="" className="input-icon" />
                  <DatePicker
                    selected={startTime}
                    onChange={date => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    useWeekdaysShort={true}
                  />
                </div>
                <div className="event-form__input-wrap input-location">
                  <img src={markIcon} alt="" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder={t("location")}
                    name="location"
                    value={location}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="event__submit">
                <Button className="btn btn--p16">
                  {t("create-invitation")}
                </Button>
              </div>
            </form>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

EventSetup.getInitialProps = async () => ({
  namespacesRequired: ["event-setup"]
});

EventSetup.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.event
});

export default withTranslation("event-setup")(
  connect(mapStateToProps, { createEvent })(EventSetup)
);
