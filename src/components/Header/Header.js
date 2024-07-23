import React from 'react';
import "./styles.css";

const Header = ({ authStatus, signOut }) => (
    <header className='header'>
        <div className='title-line'>
            <h1>Atoms</h1>
            {authStatus === "authenticated" && <button aria-label="Sign out" onClick={signOut}>Sign out</button>}
        </div>
        <p>Track your habits atomically.</p>
    </header>
);

export default Header;