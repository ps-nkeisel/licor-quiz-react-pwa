import React from 'react';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';

import logo2 from '../../static/img/logo2.png';
import '../../styles/components/invite-confirmation.scss';
import '../../styles/components/text-block.scss';

const InviteConfirmation = () => {
  return (
    <Page title='Invite Confirmation'>
      <Wrapper className='invite-wrap'>
        <div className='text-block-invite'>
          <h2 className='title-big'>
            Thanks for your
            <span>Confirmation</span>
          </h2>
        </div>
        <img src={logo2} alt='logo' className='invite-confirmation' />
      </Wrapper>
    </Page>
  );
};

export default InviteConfirmation;
