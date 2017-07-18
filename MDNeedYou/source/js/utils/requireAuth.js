import React from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createHashHistory'
import PropTypes from 'prop-types';
import Login from '../components/basic_components/Login'

export default function(ComposedComponent) {
  class Authenticate extends React.Component {

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        createHistory().push('/login'+this.props.location.pathname);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        createHistory().push('/login'+this.props.location.pathname);
      }
    }

    render() {
      const path = this.props.location;
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool,
  }

  Authenticate.contextTypes = {
    router: PropTypes.object
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
