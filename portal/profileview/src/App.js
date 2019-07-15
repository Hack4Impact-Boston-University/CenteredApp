import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';

import Navb from './js/components/navbar/Navb.jsx';
import Posts from './js/components/posts/Posts.jsx';
import ProfilePicture from './js/components/profilepicture/ProfilePicture.jsx';
import FriendsBar from './js/components/friendsbar/FriendsBar.jsx';

import styles from './common/css/styles.css';

import avatar1 from './common/img/avatar1.png';


class App extends React.Component {
  render() {
  return (
    <div>
            <Navb/>
            {/*<Background/>*/}
            <ProfilePicture/>
            <div className="jumbotron" id="bio">
              <h1>Bio</h1>
              <p>Hello, I'm Jason. Welcome to my page!</p>
            </div>
            <FriendsBar/>
            <Posts/>
    </div>
    );
  }
}

export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
