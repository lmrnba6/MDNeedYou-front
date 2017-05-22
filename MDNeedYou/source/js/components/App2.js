import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions";;
import { fetchTweets } from "../actions/tweetsActions";

import About from "./basic_components/About";
import Client from "./basic_components/Client";
import ContactUs from "./basic_components/ContactUs";
import Footer from "./basic_components/Footer";
import Modal from "./basic_components/Modal";
import Portfolio from "./basic_components/Portfolio";
import Service from "./basic_components/Service";
import Team from "./basic_components/Team";




import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

@connect(store => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
  };
})
export default class App extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchUser());
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets());
  }

  render() {

    const { user, tweets } = this.props;
    const mappedTweets = (!tweets.length) ? [] : tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)

    return (
      <Router>
        
        <div>
        <Nav2 />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/nav">Nav</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          

          <Route exact path="/" component={Home} />
          <Route exact path="/nav" render={() => (
            <div>
              <Nav />
              <h1>{user.name}</h1>
              <ul>{mappedTweets}</ul>
            </div>
          )} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />

        </div>
      </Router>
    );
  }

}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
);
