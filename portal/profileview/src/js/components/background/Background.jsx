import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import water from '../../../common/img/water.jpg';


class Background extends React.Component{
  render() {
    return(
    <div>
        <div id="background">
            <img src={water}></img>
        </div>
    </div>
    );
  }
}

export default Background;