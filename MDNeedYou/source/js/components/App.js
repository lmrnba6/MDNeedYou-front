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
import Nav from "./basic_components/Nav";
import Header from "./basic_components/Header";


export default class App extends React.Component {

  render() {

    return (
      <div>
      <Nav />
      <Header />
      <Service />
      <Portfolio />
      <About />
      <Team />
      <Client />
      <ContactUs />
      <Footer />
      </div>
    );
  }

}
