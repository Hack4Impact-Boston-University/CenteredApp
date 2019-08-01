import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./blog-post.css"
import "./Comment List"
import Component from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      loading: false
    };
    this.addComment = this.addComment.bind(this);
  }

  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }
  render (){
    return(
    <div className="App">
      <header className="App-header">
      <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <h1 class="mt-4">Post Title</h1>
              <p class="lead">
              by
              <a href="#">Start Bootstrap</a>
              </p>
              <hr/>
              <h5>Posted on January 1, 2019 at 12:00 PM</h5>
              <hr/>
              <img class="img-fluid rounded" src="http://placehold.it/900x300" alt=""/>

              <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>

              <blockquote class="blockquote">
              <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer class="blockquote-footer">Someone famous in
              <cite title="Source Title">Source Title</cite>
              </footer>
              </blockquote>
              <hr/>
            </div>
          </div>
        </div>

      </header>
    </div>
  );
  }
}

export default App;
