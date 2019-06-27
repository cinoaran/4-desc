import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';



class Logout extends Component {
  render() {
    return (
      <Fragment>
        <button className="nav-link" onClick={this.props.logout}>
          logout
        </button>
      </Fragment>
    )
  }
}

export default connect(null, { logout })(Logout);