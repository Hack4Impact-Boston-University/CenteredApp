import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import { Button } from 'react-bootstrap';


function myFunction(){
    var x = document.getElementById("makepost");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

class MakePost extends Component {
    constructor() {
      super();
      this.state = {
        user: "",
        topic: "",
        message: "",
        image: "",
      };
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
      this.setState({ [event.target.id]: event.target.value });
    }

    toggle(){
        this.setState({
            shown:!this.state.shown
        });
    }

    render() {
        var shown = {
            display:this.state.shown ? "block":"none"
        };

        var hidden = {
            display: this.state.shown ? "none":"block"
        }

      const { user, topic, message, image } = this.state;
      return (
        <div id="makepost">
        <Button id="makepostbutton" onClick={this.toggle.bind(this)}>Make a Post</Button>
        <div style={hidden}></div>
        <div style={shown}>
        <form>
          <Input
            text="Post Topic"
            label="topic"
            type="text"
            id="topic"
            value={topic}
            handleChange={this.handleChange}
          />
        </form>
        <form>
            <textarea 
            placeholder="Type your post here."
            value = {this.state.message} 
            id="message"
            rows="3"
            cols="20"
            onChange={this.handleChange}
            />
        </form>
        <form>
          <Input
            text="Images"
            label="image"
            type="file"
            id="image"
            value={image}
            accept="image/*"
            handleChange={this.handleChange}
          />
        </form>
        {/*<Button onClick={this.props.onSubmit}>Submit</Button>*/}
        <p>{message}</p>
        <div>{image}</div>
        <Button>Submit</Button>
        </div>
        </div>
      );
    }
  }
  
  export default MakePost;
  
  const wrapper = document.getElementById("make-post");
  wrapper ? ReactDOM.render(<MakePost />, wrapper) : false;