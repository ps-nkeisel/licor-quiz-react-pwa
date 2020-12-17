import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Wrapper from '../../components/wrapper/Wrapper';
import Page from '../../components/layout/Page';
import Button from '../../components/button/Button';
import { getInvitedContacts } from '../../actions/contactsActions';
import { withTranslation } from '../../i18n';

import Spinner from '../../components/spinner/Spinner';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../styles/components/text-block.scss';
import '../../styles/components/event.scss';

import userIcon from '../../static/img/user.svg';

const EventGuests = ({
  contacts,
  token,
  selectedEventId,
  getInvitedContacts,
  t
}) => {
  const body = {
    event_id: selectedEventId
  };
  useEffect(() => {
    getInvitedContacts(body);
  }, []);
  return (
    <Page title='Event Guests' headerType='withMenu'>
      <div className='container'>
        <Wrapper style={{ justifyContent: 'inherit' }}>
          {contacts.isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className='text-block' style={{ marginBottom: '10vh' }}>
                <h2 className='title-big'>
                  {t('check')}
                  <span> {t('whos-coming')}</span>
                </h2>
              </div>
              <div className='event-invites-scroll-wrap'>
                <PerfectScrollbar className='event-invites'>
                  {contacts.contactsAttending.map(({ id, name, location }) => {
                    return (
                      <div
                        key={id}
                        className='event-invites__item event-invites__item--attending'
                      >
                        <div className='event-invites__item-img'>
                          <img src={userIcon} alt='user' />
                        </div>
                        <div className='event-invites__item-text-wrap'>
                          <div className='event-invites__item-text event-invites__item-text--bold'>
                            {name}
                          </div>
                          <div className='event-invites__item-text event-invites__item-text--small'>
                            {location}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {contacts.contactsPending.map(({ id, name, location }) => {
                    return (
                      <div key={id} className='event-invites__item'>
                        <div className='event-invites__item-img'>
                          <img src={userIcon} alt='user' />
                        </div>
                        <div className='event-invites__item-text-wrap'>
                          <div className='event-invites__item-text event-invites__item-text--bold'>
                            {name}
                          </div>
                          <div className='event-invites__item-text event-invites__item-text--small'>
                            {location}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {contacts.contactsNotAttending.map(
                    ({ id, name, location }) => {
                      return (
                        <div
                          key={id}
                          className='event-invites__item event-invites__item--not-attending'
                        >
                          <div className='event-invites__item-img'>
                            <img src={userIcon} alt='user' />
                          </div>
                          <div className='event-invites__item-text-wrap'>
                            <div className='event-invites__item-text event-invites__item-text--bold'>
                              {name}
                            </div>
                            <div className='event-invites__item-text event-invites__item-text--small'>
                              {location}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </PerfectScrollbar>
              </div>
              {token && (
                <div className='btn-wrapper event-invites__btn-wrap'>
                  <Button
                    component='link'
                    href='/event/invites'
                    className='btn btn--invert'
                  >
                    {t('edit-guest-list')}
                  </Button>
                </div>
              )}
            </>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

EventGuests.getInitialProps = async () => ({
  namespacesRequired: ['event-guests']
});

EventGuests.propTypes = {
  t: PropTypes.func.isRequired,
  contacts: PropTypes.object,
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.auth.token,
  contacts: state.contacts,
  selectedEventId: state.event.createdEvent.id
});

export default withTranslation('event-guests')(
  connect(mapStateToProps, { getInvitedContacts })(EventGuests)
);
