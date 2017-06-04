import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Login from '../components/basic_components/Login'

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
      login: false,
			redirect: false,
		};

	}
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.setState({login:true})
        //this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.setState({redirect:true})
      }
    }

    render() {
      const path = this.props.location;
      return (
        this.state.login ?
				<Redirect to={'/login'}/> :
        this.state.redirect ?
        <Redirect to={'/login'}/> :
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
