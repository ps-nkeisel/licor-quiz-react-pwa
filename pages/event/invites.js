import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Wrapper from '../../components/wrapper/Wrapper';
import Page from '../../components/layout/Page';
import Button from '../../components/button/Button';
import ConfirmationScreen from '../../components/confirmation-screen/ConfirmationScreen';
import Spinner from '../../components/spinner/Spinner';
import { getContacts, inviteContacts } from '../../actions/contactsActions';
import { withTranslation } from '../../i18n';
import { isSafari } from 'react-device-detect';

import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../styles/components/text-block.scss';
import '../../styles/components/event.scss';

import userIcon from '../../static/img/user.svg';

const EventInvites = ({ contacts, inviteContacts, createdEvent, t }) => {
  const [showConfirmationScreen, setConfirmationScreen] = useState(false);
  const [invitedContacts, setInvitedContacts] = useState([]);
  const [scrollbarRef, setScrollbarRef] = useState(createRef());
  const closeConfirmationScreen = () => setConfirmationScreen(false);
  // Extracting unique first letters
  const letters = [
    ...new Set(contacts.contacts.map(contact => contact.name[0].toUpperCase()))
  ];
  const [selectedLetter, setSelectedLetter] = useState(letters[0]);

  // Making a copy of letters array
  const tempLetters = [...letters];
  // Creating refs for every letter
  const refs = letters.reduce((acc, value) => {
    acc[value] = createRef();
    return acc;
  }, {});

  const scrollTo = value => {
    const offsetTop = refs[value].current.offsetTop;
    scrollbarRef.scrollTop = offsetTop;
  };

  return (
    <Page title='Event Invites' headerType='withMenu'>
      <div className='container'>
        <Wrapper className='event-wrap'>
          <div className='text-block'>
            <h2 className='title-big'>
              {t('lets-gather')}
              <span> {t('everyone')}</span>
            </h2>
            <span className='text-block__text text-block__text--center'>
              {t('select-your-guests')}
            </span>
          </div>
          {contacts.isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className='event-invites-scroll-wrap'>
                <div className='event-invites__letters'>
                  {letters.map(letter => (
                    <span
                      key={letter}
                      onClick={() => {
                        setSelectedLetter(letter);
                        scrollTo(letter);
                      }}
                      className={`${
                        letter === selectedLetter ? 'letter-selected' : ''
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <PerfectScrollbar
                  className='event-invites'
                  style={isSafari ? { height: '40vh' } : {}}
                  containerRef={ref => {
                    setScrollbarRef(ref);
                  }}
                >
                  {contacts.contacts.map(contact => {
                    const { id, name, location, number, email } = contact;
                    const firstLetter = name[0];
                    const index = tempLetters.indexOf(firstLetter);
                    // Check if contact is already invited
                    const indexInvited = invitedContacts.indexOf(contact);
                    if (index !== -1) {
                      tempLetters.splice(index, 1);
                      return (
                        <React.Fragment key={id}>
                          <div
                            className='event-invites__letter'
                            ref={refs[firstLetter]}
                          >
                            {firstLetter}
                          </div>
                          <div key={id} className='event-invites__item'>
                            <div className='event-invites__item-img'>
                              <img src={userIcon} alt='user' />
                            </div>
                            <div className='event-invites__item-text-wrap'>
                              <div className='event-invites__item-text event-invites__item-text--bold'>
                                {name}
                              </div>
                              <div className='event-invites__item-text event-invites__item-text--small'>
                                {location || 'Unknown address'}
                              </div>
                            </div>
                            <div className='event-invites__btn-wrap'>
                              <button
                                className={`btn ${
                                  indexInvited > -1 ? 'btn--active' : ''
                                }`}
                                onClick={() => {
                                  // Invite if not invited already
                                  if (indexInvited === -1) {
                                    setInvitedContacts(prevState => [
                                      ...prevState,
                                      contact
                                    ]);
                                  } else {
                                    const invitedTemp = [...invitedContacts];
                                    invitedTemp.splice(index, 1);
                                    setInvitedContacts(invitedTemp);
                                  }
                                }}
                              >
                                {`${t('invite')}${
                                  indexInvited > -1 ? 'd' : ''
                                }`}
                              </button>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    } else {
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
                              {location || 'Unknown address'}
                            </div>
                          </div>
                          <div className='event-invites__btn-wrap'>
                            <Button
                              className={`btn ${
                                indexInvited > -1 ? 'btn--active' : ''
                              }`}
                              onClick={() => {
                                // Invite if not invited already
                                if (indexInvited === -1) {
                                  setInvitedContacts(prevState => [
                                    ...prevState,
                                    contact
                                  ]);
                                } else {
                                  const invitedTemp = [...invitedContacts];
                                  invitedTemp.splice(index, 1);
                                  setInvitedContacts(invitedTemp);
                                }
                              }}
                            >
                              {indexInvited > -1 ? t('invited') : t('invite')}
                            </Button>
                          </div>
                        </div>
                      );
                    }
                  })}
                </PerfectScrollbar>
              </div>
              <div className='btn-wrapper event-invites__btn-wrap'>
                <Button
                  className='btn button--invites'
                  style={{
                    padding: '12px 10px',
                    margin: '0 5px 15px 5px',
                    width: '50%'
                  }}
                  onClick={() => {
                    inviteContacts(
                      invitedContacts,
                      createdEvent.id,
                      setConfirmationScreen
                    );
                    setConfirmationScreen(prevState => !prevState);
                  }}
                >
                  {t('send-invites')}
                </Button>
                <Button
                  component='link'
                  href='/add-new-contact'
                  className='btn button--invites'
                  style={{
                    padding: '8px 10px',
                    margin: '0 5px 15px 5px',
                    width: '50%'
                  }}
                >
                  {t('add-new')}
                </Button>
              </div>
            </>
          )}
        </Wrapper>
      </div>
      {showConfirmationScreen && (
        <ConfirmationScreen
          text='Great,Invitations are on the way!'
          closeConfirmationScreen={closeConfirmationScreen}
          nextPage='/selection/food'
        />
      )}
    </Page>
  );
};

EventInvites.getInitialProps = ({ store }) => {
  const { token } = store.getState().auth;
  getContacts()(store.dispatch);
  return {
    namespacesRequired: ['event-invites']
  };
};

EventInvites.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contacts: state.contacts,
  createdEvent: state.event.createdEvent
});

export default withTranslation('event-invites')(
  connect(mapStateToProps, { getContacts, inviteContacts })(EventInvites)
);
