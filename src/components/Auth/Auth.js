import React from 'react';

import Login from './Login';

import "./styles.css";

const Auth = ({ authStatus, ackConfirmation, signIn, signUp }) => {
  
  return (
    <div>

      {authStatus === 'unauthenticated' && <Login signIn={signIn} signUp={signUp} />}
      {authStatus === 'awaiting-confirmation' && 
      <>
        <p>We've sent you an email to confirm your email. After confirming, you can sign in!</p>
        <button onClick={ackConfirmation}>Yes, I'll go confirm through the automated email you sent me right now.</button>
      </>}

    </div>
  );
};

export default Auth;
