import React from 'react';
import Firebase from '../../Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = props => {

  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    Firebase.doAuthListener(user => {
      if (user) {
        setAuthUser(user);
        console.log('User logged in: ', user);
      } else {
        setAuthUser(null);
        console.log('Logged out');
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};