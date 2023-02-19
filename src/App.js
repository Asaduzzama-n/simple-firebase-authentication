import logo from './logo.svg';
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init'
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const handleGitSignIn = () =>{
    signInWithPopup(auth,gitProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error =>{
      console.error(error);
    })
  }


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
        user.uid ? <button onClick={handleSignOut}>Sign Out</button> : 
        <>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGitSignIn}>GitHub Sign In</button>

        </>
      }
      
      {
        user.uid && <div className="user-info">
          <h1>User Name: {user.displayName}</h1>
          <h4>Email: {user.email}</h4>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
