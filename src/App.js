import React, { useEffect, useState } from 'react';

import Header from './components/Header/Header.js';
import Auth from './components/Auth/Auth.js';
import Task from './components/Task/Task.js';
import Footer from './components/Footer/Footer.js';

import { supabase } from './lib/supabase.js'

// auth_statuses = ["unauthenticated", "awaiting-confirmation", "authenticated"];

const initialState = {
  auth_status: "unauthenticated",
  task: null,
  errors: [],
  loading: true,
};

const supabase_db = new supabase();

const format_errors = {
  "AuthApiError": "Authentification error: Check your authentification details are correct and try again.",
  "TypeError: Failed to fetch": "Facing a connection issue: Are you connected to the internet?",
  "TypeError: NetworkError when attempting to fetch resource.": "Facing a connection issue: Are you connected to the internet?",
  "new row violates row-level security policy for table \"task_data\"": "Authentification error: Your session is invalid. Sign in again to fix."
}

const App = ({ db = supabase_db }) => {

  const [state, setState] = useState(initialState);

  useEffect(() => {
    db.useSession(state.loading, (data) => {
      const auth_status = (!!data.session.data.session & !data.session.error) ? "authenticated" : "unauthenticated";
      const task = data.tasks.error ? null : data.tasks.data[0];

      const errors = [ data.session.error, data.tasks.error ].filter(error => error);

      setState(state => ({ ...state, auth_status, task, errors, loading: false }))
    });
  })

  const signIn = db.signIn((data) => {

    const auth_status = !data.error ? "authenticated" : "unauthenticated";
    const errors = [ data.error ].filter(error => error);
    setState(state => ({ ...state, auth_status, errors }));
  });

  const signUp = db.signUp((data) => {

    const auth_status = data.error ? "unauthenticated" : "awaiting-confirmation";
    const errors = [ data.error ].filter(error => error);

    setState(state => ({ ...state, auth_status, errors }));
  })

  const signOut = db.signOut((data) => {

    const errors = [ data?.error ].filter(error => error);

    setState(state => ({ ...state, auth_status: "unauthenticated", errors }));
  });

  const createTask = db.createTask((data) => {
    const task = !data.error ? data.data[0] : null;
    const errors = [ data.error ].filter(error => error);

    setState(state => ({ ...state, task, errors }));
  });

  const endTask = db.endTask((data) => {
    const task = data.error ? state.task : null;
    const errors = [ data.error ].filter(error => error);

    setState(state => ({ ...state, task, errors }));
  });

  const generateDownloadLink = db.generateDownloadLink;

  const ackConfirmation = () => {
    setState(state => ({ ...state, auth_status: 'unauthenticated' }))
  }

  const loadingStyle = { display: (state.loading ? "none" : "") };
  const maxWidth = '20rem';
  const margin = '5rem auto';
  const errorStyle = { 
    display: state.errors.length > 0 ? '' : 'none',
    position: 'absolute', 
    maxWidth, 
    top: "0.5rem", 
    backgroundColor: "#FAA", 
    padding: "1rem"  
  };

  return (
    <div style={{ maxWidth, margin }}>
      <Header authStatus={state.auth_status} signOut={signOut} />

      <main style={{ margin, ...loadingStyle }} >

        <p aria-label="Error" style={errorStyle}>{JSON.stringify(state.errors.map(e => format_errors[e.name || e.message] || e)).slice(2, -2)}</p>
        
        {state.auth_status !== 'authenticated' && <Auth authStatus={state.auth_status} ackConfirmation={ackConfirmation} signIn={signIn} signUp={signUp} />}
        {state.auth_status === 'authenticated' && <Task currentTask={state.task} createTask={createTask} endTask={endTask} />}
      </main>

      <Footer authStatus={state.auth_status} generateDownloadLink={generateDownloadLink} />
    </div>
  );
}

export default App;
