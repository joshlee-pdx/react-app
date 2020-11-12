import React from 'react';

// Acts as a globally available JS object
const authContext = React.createContext({
  autheticated: false,
  login: () => {}
});

export default authContext;