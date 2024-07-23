import React, { useState } from 'react';

const Login = ({ signIn, signUp }) => {

    const [input, setInput] = useState({ email: "", password: "" });
  
    return (
      <div className='auth'>
        <h2>Sign up or sign in</h2>
        <input aria-label="Email" type="email" placeholder="example@email.com" value={input.email} onInput={e => setInput({...input, email: e.target.value})}></input>
        <input aria-label="Password" type="password" placeholder="12345" value={input.password} onInput={e => setInput({...input, password: e.target.value})}></input>
        
        <div className='btns'>
          <button aria-label="Sign up" onClick={signUp(input.email, input.password)}>Sign up</button>
          <button aria-label="Sign in" onClick={signIn(input.email, input.password)}>Sign in</button>
        </div>
      </div>
    );
  };

  export default Login;