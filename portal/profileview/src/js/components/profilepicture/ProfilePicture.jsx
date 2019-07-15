import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import avatar1 from '../../../common/img/avatar1.png';

class ProfilePicture extends React.Component {
    render() {
    return (
        <div>
            <div id="profilebackground">
            <div className="jumbotron">
            <Button className="changepicture">Change Picture</Button>
            <div className="row">
                <div className="col-12 col-md-12 col-xl-12">
                <h1>Jason Banks</h1>
                <img id="profilepicture" src={avatar1} />
                </div>
            </div>
            </div>
            </div>
        </div>
        );
    }
}

export default ProfilePicture;