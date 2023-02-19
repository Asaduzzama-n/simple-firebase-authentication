import logo from './logo.svg';
import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init'
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .then(error => {
        console.error(error);
      })
  }


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }

  return (
    <div className="App">
      {
        user.email ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      {
        user.email && <div className="user-info">
          <h1>User Name: {user.displayName}</h1>
          <h4>Email: {user.email}</h4>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
