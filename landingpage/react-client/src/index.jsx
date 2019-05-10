
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import ThemeSwitcher from './Components/ThemeSwitcher';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render(<ThemeSwitcher />, document.getElementById('root'));
registerServiceWorker();