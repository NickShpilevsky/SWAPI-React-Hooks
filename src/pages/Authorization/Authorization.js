import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import {authorized} from "../../reducers";

class Authorization extends Component {
  // static PropTypes = {
  //   authorized: PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  state = {
    isLoggedIn: false,
    userId: '',
    name: '',
    email: '',
    picture: '',
  };

  componentClicked = () => {
    console.log("clicked");
  };

  responseFacebook = response => {
    if(response) {
      console.log(response);
      this.props.authorized();
    } else {
      console.log('No Response');
    }
  };

  render() {
    let fbContent;

    if(this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="320314542705859"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} />
      );
    }

    return (
      <div>
        {fbContent}
      </div>
    )
  }
}

export default connect(null, { authorized })(Authorization);