import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state= {
      userName: "Bangstry",
      user: {},
      followers: []
    };
  }

  userChange = (userName) => {
    this.setState({ userName });
  }

  componentDidMount() {
    console.log("First Render (mounting)");
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(res => res.json())
      .then(data => this.setState({ user: data }));
    fetch(`https://api.github.com/users/${this.state.userName}/followers`)
      .then(res => res.json())
      .then(data => this.setState({ followers: data }));
        
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <Search userChange={this.userChange} />
        <UserCard user={this.state.user} followers={this.state.followers} />
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.userChange(this.state.search);
    this.setState({ search: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text"
               name="search"
               placeholder="search"
               value={this.state.search}
               onChange={this.handleChange}/>
        <button type="submit">Search for a User</button>
      </form>
    );
  }
}

function UserCard(props) {
  return (
    <div>
      <h2>{props.user.login}</h2>
      <p>{props.user.location}</p>
      <p>{props.user.url}</p>
      <div>
        {props.followers.map(follower => (
          <div key={follower.id}>{follower.login}</div>
        ))}
      </div>
    </div>
  );
}

export default App;