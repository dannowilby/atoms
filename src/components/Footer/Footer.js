import React, { useState } from 'react';

const Footer = (props) => {
  const [url, setUrl] = useState("");
  
  const generateDownloadLink = props.generateDownloadLink(( data ) => {
    if(!data.error)
      setUrl(data.data);
  })

  return (
    <footer style={{ marginTop: '2rem' }}>
        {props.authStatus === "authenticated" && <button onClick={generateDownloadLink}>Create link to data</button>}
        <p>{url !== "" && <a href={url} target="_blank" rel="noopener noreferrer">Link to your data</a>}</p>
        
        <a href="https://dywilby.io/"><h4>Created by Daniel Y. Wilby</h4></a>
      </footer>
  );
}

export default Footer;