import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './HomePage';
import NavBar from './HeaderComponent/NavBar';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route name="home" exact path="/" component={HomePage} />
        </div>
      </Router>
    )
  }
}
export default App;

class MyComponent extends Component{
  render() {
     return <div>
               <h1>Hello World!</h1>
               <p>This is my first React Component.</p>
            </div>
     }
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*figure this out in a bit*/
/*class Header extends Component{
  render() {
    return (<div>NavBar.jsx</div>)
  }
}
export default Header;*/