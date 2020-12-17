import React, { useState, useEffect } from 'react';
import request from '../../../util/fetch';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../../util/varibales';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Wrapper from '../../../components/wrapper/Wrapper';
import Page from '../../../components/layout/Page';
import Button from '../../../components/button/Button';
import { setUser } from '../../../actions/authActions';
import { selectEvent } from '../../../actions/eventActions';
import { withTranslation } from '../../../i18n';

import '../../../styles/components/forms.scss';
import Spinner from '../../../components/spinner/Spinner';
import '../../../styles/components/text-block.scss';
import '../../../styles/components/slider.scss';
import '../../../styles/components/event.scss';

import logo2 from '../../../static/img/logo2.png';

const WhatsAppPortal = ({ t, setUser, selectEvent }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [guestName, setGuestName] = useState('');

  const router = useRouter();

  const onChange = e => setGuestName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    router.push('/whatsapp/invite-confirmation');
  };

  // Get event info
  useEffect(() => {
    const body = {
      whatsapp_code: router.query.id
    };
    (async function fetchHost() {
      const data = await request(`${BASE_URL}/api/whatsapp-code`, 'POST', body);
      console.log(data);
      selectEvent({ id: data.id, title: data.name });
      setData(data);
      setIsLoading(false);
    })();
  }, []);

  // Confirm or decline invitation
  const respond = async attending => {
    const body = {
      event_id: data.id,
      name: guestName,
      attending
    };
    const res = await request(`${BASE_URL}/api/whatsapp-attending`, 'POST', body);
    console.log('whatsapp attending', res);
    setUser({
      name: guestName
    });
  };

  return (
    <Page title="WhatsApp Portal" headerType="small">
      <div className="event">
        <Wrapper className="event-wrap">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="text-block text-block__text--center">
                <h2 className="text-block__text">
                  {t('lets-gather-and-enjoy')}
                  <span>
                    <br></br> {t('a-great-time-together')}
                  </span>
                </h2>
                <span
                  className="text-block__text text-block__text--small"
                  style={{ marginTop: 30 }}
                >
                  {data.user.name} {t('has-invited-you-to')}
                  <br></br> {`"${data.name}"`}
                </span>
                <span
                  className="text-block__text text-block__text-sm"
                  style={{ marginTop: 30 }}
                >
                  {t('great-food')}
                </span>
                <span
                  className="text-block__text text-block__text-sm"
                  style={{ marginTop: 30, fontWeight: 'bold' }}
                >
                  {t('it-will-be-magic')}
                </span>
              </div>
              <form
                onSubmit={onSubmit}
                className="event-form"
                autoComplete="off"
              >
                <div className="event-form__inputs">
                  <div className="event-form__input-wrap">
                    <input
                      className="input input--white input--mb-25"
                      style={{ textTransform: 'capitalize' }}
                      type="text"
                      name="name"
                      value={guestName}
                      onChange={onChange}
                      placeholder={t('insert-your-name')}
                    />
                  </div>
                </div>
                <div className="event__submit">
                  <Button
                    className="btn"
                    style={{ margin: '0 5px', padding: '16px 10px' }}
                    onClick={() => respond(true)}
                  >
                    {t('ill-be-there')}
                  </Button>
                  <Button
                    className="btn btn--invert"
                    style={{ margin: '0 5px', padding: 10 }}
                    onClick={() => respond(false)}
                  >
                    {t('i-cant-make-it')}
                  </Button>
                </div>
              </form>
              <img src={logo2} alt="Logo" style={{ marginBottom: 30 }} />
            </>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

WhatsAppPortal.getInitialProps = async () => ({
  namespacesRequired: ['whatsapp-portal']
});

WhatsAppPortal.propTypes = {
  t: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withTranslation('whatsapp-portal')(
  connect(mapStateToProps, { setUser, selectEvent })(WhatsAppPortal)
);
