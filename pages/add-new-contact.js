import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Wrapper from '../components/wrapper/Wrapper';
import Page from '../components/layout/Page';
import Button from '../components/button/Button';
import Alert from '../components/alert/Alert';
import { validateNewContactFields } from '../components/validation/formValidation';
import { addNewContact } from '../actions/contactsActions';
import { withTranslation } from '../i18n';

//components
import 'react-tabs/style/react-tabs.css';
import '../styles/components/forms.scss';
import Spinner from '../components/spinner/Spinner';
import '../styles/components/text-block.scss';
import '../styles/components/tabs.scss';
import '../styles/components/event.scss';

//images
import envelopeIcon from '../static/img/envelope-solid.svg';
import mobileIcon from '../static/img/mobile-solid.svg';

const AddNewContact = ({ addNewContact, errorMsg, isLoading, t }) => {
  const router = useRouter();
  const [isFormValid, setFormValid] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    phoneNumber: ''
  });
  const [method, setMethod] = useState(1);
  const { name, location, email, phoneNumber } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () =>
    setFormData({
      name: '',
      location: '',
      email: '',
      phoneNumber: ''
    });

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      location,
      email: method === 1 ? email : null,
      phoneNumber: method === 2 ? phoneNumber : null
    };
    const { isValid } = validateNewContactFields(data);
    if (!isValid) {
      setFormValid(false);
      return;
    }
    addNewContact(data, router);
    // resetForm();
  };

  return (
    <Page title='Add New Contact' headerType='withMenu'>
      <div className='event'>
        <Wrapper className='event-wrap'>
          <div className='text-block'>
            <h2 className='title-big'>
              {t('lets-gather')}
              <span> {t('everyone')}</span>
            </h2>
            <span
              className='text-block__text text-block__text--center'
              style={{ marginTop: 15 }}
            >
              {t('enter-contact-info')}
            </span>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={onSubmit} className='event-form' autoComplete='off'>
              <div
                className='event-form__inputs'
                style={{ marginBottom: '14%' }}
              >
                {(!isFormValid || errorMsg) && (
                  <Alert msg={errorMsg || 'Invalid Form'} />
                )}
                <div className='event-form__input-wrap'>
                  <input
                    className='input input--white input--mb-25'
                    type='text'
                    name='name'
                    placeholder={t('full-name')}
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className='event-form__input-wrap'>
                  <input
                    className='input input--white input--mb-25'
                    type='text'
                    name='location'
                    placeholder={t('location')}
                    value={location}
                    onChange={onChange}
                  />
                </div>
                <div className='tabs'>
                  <Tabs>
                    <TabList className='tabs__head'>
                      <Tab
                        className='tabs__head-item'
                        selectedClassName='tabs__head-item--active'
                        style={{
                          borderTopLeftRadius: 25,
                          borderBottomLeftRadius: 25,
                          padding: '8px 15px'
                        }}
                        onClick={() => setMethod(1)}
                      >
                        <span className='tabs__head-item__text'>E-mail</span>
                      </Tab>
                      <Tab
                        className='tabs__head-item'
                        selectedClassName='tabs__head-item--active'
                        style={{
                          borderTopRightRadius: 25,
                          borderBottomRightRadius: 25,
                          padding: '8px 15px'
                        }}
                        onClick={() => setMethod(2)}
                      >
                        <span className='tabs__head-item__text'>SMS</span>
                      </Tab>
                    </TabList>
                    {/* EMAIL TAB */}
                    <TabPanel className='tabs__body' style={{ marginTop: 40 }}>
                      <div className='event-form__input-wrap input-location'>
                        <img src={envelopeIcon} alt='' className='input-icon' />
                        <input
                          className='input'
                          type='email'
                          name='email'
                          placeholder='Email address'
                          value={email}
                          onChange={onChange}
                        />
                      </div>
                    </TabPanel>
                    {/* SMS TAB */}
                    <TabPanel className='tabs__body'>
                      <div className='event-form__input-wrap input-location'>
                        <img
                          src={mobileIcon}
                          alt=''
                          className='input-icon'
                          style={{ width: 15 }}
                        />
                        <input
                          className='input'
                          type='text'
                          name='number'
                          placeholder='Phone number'
                          value={phoneNumber}
                          onChange={onChange}
                        />
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
              <div className='event__submit'>
                <Button className='btn btn--p16'>{t('save-contact')}</Button>
              </div>
            </form>
          )}
        </Wrapper>
      </div>
    </Page>
  );
};

AddNewContact.getInitialProps = () => ({
  namespacesRequired: ['add-new-contact']
});

AddNewContact.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorMsg: state.error.msg,
  isLoading: state.contacts.isLoading
});

export default withTranslation('add-new-contact')(
  connect(mapStateToProps, { addNewContact })(AddNewContact)
);
