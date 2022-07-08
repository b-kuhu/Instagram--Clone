import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from "./Firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  //useEffect runs a piece of code based on specific condition.runs when page is refreshed

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        console.log(authUser);
        setUser(authUser);
      }
      else {
        //user has logged out...
        setUser(null);
      }
    })
    return () => {
      //perform cleanup actions like removing duplicates etc
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })

      .catch((error) => alert(error.message));
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img className="app_headerImage"
                src="https://fontmeme.com/images/instagram-new-logo.png"
                width="130px"
                alt="">
              </img>
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit " onClick={signUp}>Sign Up</Button>
          </form>

        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img className="app_headerImage"
                src="https://fontmeme.com/images/instagram-new-logo.png"
                width="130px"
                alt="">
              </img>
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit " onClick={openSignIn}>Sign In</Button>
          </form>

        </div>
      </Modal>
      <div className="app__header">
        <img src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png " alt="photu" className="app__headerImage" />


      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>


      )}



      {
        posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageURL={post.imageURL}
          />//Whenever 
        ))
      }



    </div >
  );
}

export default App;
// {
    //   username: "reactOfficial",
    //   caption: "welcome to react world", imageURL: "https://daviseford.com/blog/public/img/thumbnails/misc/react-logo.png"
    // },
    // {
    //   username: "Arya Vats",
    //   caption: "Hello,I am Mr.perfect ! <3",
    //   imageURL: "https://avatars.githubusercontent.com/u/89343269?v=4"
    // },{username:"Doaraemon", caption:"Main hun ek ulta robot", imageURL:"https://cdn.pixabay.com/photo/2017/04/26/18/36/cartoon-art-2263376_1280.png"}
