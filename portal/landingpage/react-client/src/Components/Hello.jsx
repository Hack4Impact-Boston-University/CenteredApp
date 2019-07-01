var Hello = React.createClass({
    render: function () {
      return (
        React.createElement('div', null, 'Hello, haters!')
      );
    }
});

ReactDOM.render(<Hello />, document.getElementById('container'));


//cleaner jsx code
/*var Hello = React.createClass({
    render: function() {
        return <div>Hello, haters!</div>;
    }
});

ReactDOM.render(<div>Hello, haters!</div>, document.getElementById('container'));
*/