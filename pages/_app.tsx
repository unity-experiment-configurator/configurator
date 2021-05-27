import React from 'react'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/Context'
import '../styles/globals.css'
import { useUserData } from '../lib/Hooks';

function MyApp({ Component, pageProps }) {
  
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp
