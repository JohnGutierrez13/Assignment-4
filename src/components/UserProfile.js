// src/components/UserProfile.js
// The UserProfile component is used to demonstrate the use of Route and Link.

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class UserProfile extends Component {
  getDate=(localDate)=>{ return localDate.slice(0,9) } 
  render() {
    return (
      
        <div>
          
          <br></br>
          <NavLink to="/" activeClassName="is-active" style={{color: "#ffe54c"}}>Return to Home</NavLink>
          <br></br><br></br>
          <h1>User Profile</h1>
          <br></br>
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.getDate(this.props.memberSince)}</div>
          <br></br>
          
        </div>
    );
  }
}

export default UserProfile;