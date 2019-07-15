import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';



class Navb extends React.Component{
  render() {
    return(
    <div id="navb">
      <nav className="navbar navbar-light navbar-expand-md">
        <div className="container-fluid"><a className="navbar-brand" href="#">Centered</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav mr-auto">
              <li className="nav-item" role="presentation"><a className="nav-link active" href="#">Landing Page</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="#">Post View</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="#">Profile View</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
  }
}

export default Navb;