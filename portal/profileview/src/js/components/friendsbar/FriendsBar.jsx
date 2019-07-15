import React, {Component} from 'react';

import avatar1 from '../../../common/img/avatar1.png';


class FriendsBar extends React.Component {
  render() {
  return (
    <div>
        <div className="jumbotron" id="friends">
            <h1>Friends</h1>
            <input type="search" id="friendsearch" placeholder="Search for your Friends"/>
            <button>Search</button>
            <ul className="list-group" id="friendlist">
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">Dmitri Kondratyev</a></li>
                <li className="list-group-item"><img className="friendpicture" src={avatar1}/><a href="#">John Cena</a></li>
            </ul>
        </div>
    </div>
    );
  }
}

export default FriendsBar;