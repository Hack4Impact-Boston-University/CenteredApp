import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import MakePost from '../makepost/MakePost.jsx';

import avatar1 from '../../../common/img/avatar1.png';


class Posts extends React.Component{
  render() {
    return(
    <div>
        <div className="jumbotron" id="posts">
          <h1>Posts</h1>
          <ul className="list-group">
            <MakePost/>
            <li className="list-group-item" id="post"><span>Post Name/Topics</span><img src={avatar1} />
              <hr />
              <p>Hello here is my 1st post</p>
            </li>
            <li className="list-group-item" id="post"><span>Name</span><img src={avatar1}/>
              <hr />
              <p>Hello here is my 1st post</p>
            </li>
            <li className="list-group-item" id="post"><span>Name</span><img src={avatar1}/>
              <hr />
              <p>Hello here is my 1st post</p>
            </li>
          </ul>
        </div>
    </div>
    );
  }
}

export default Posts;
