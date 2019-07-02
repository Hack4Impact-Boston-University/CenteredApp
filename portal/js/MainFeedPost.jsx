window.onscroll = debounce(() => {
  if (
    window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight
  ) {
    // Do awesome stuff like loading more content!
  }
}, 100);

import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";

class InfinitePosts extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      Posts: [[id:1,title:"dont we all love react",author: "dan", createdAt: DATETIME]],
    };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadPosts,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadPosts();
      }
    }, 100);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadPosts();
  }

  loadPosts = () => {
    this.setState({ isLoading: true }, () => {
      //API call to backend here for post data.  {
          // Creates a massaged array of user data
          const nextPost = results.body.results.map(post => ({
            id: post.id,
            title: post.title,
            author: Object.values(post.author).join(' '),
            photo: post.picture.medium,
            likes: post.likes,
            createdAt : post.createdAt
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: (this.state.posts.length < 100),
            isLoading: false,
            posts: [
              ...this.state.posts,
              ...nextUsers,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      posts,
    } = this.state;

    return (
      <div>
        <h1>Feed:</h1>
        {posts.map(post => (
          <Fragment key={post.id}>
            <hr />
            <div style={{ display: 'flex' }}>
              <img
                alt={post.title}
                src={post.photo}
                style={{
                  borderRadius: '50%',
                  height: 72,
                  marginRight: 20,
                  width: 72,
                }}
              />
              <div>
                <h2 style={{ marginTop: 0 }}>
                  @{post.title}
                </h2>
                <p>Author: {post.author}</p>
                <p>Date Created: {post.createdAt}</p>
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>No more posts availablex</div>
        }
      </div>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<InfinitePosts />, container);
