import React from 'react';
import { Link, hashHistory } from 'react-router';


class Navbar extends React.Component {

  componentDidUpdate(){
    this.redirectIfLoggedOut();
  }

  redirectIfLoggedOut() {
    if (!this.props.loggedIn){
      hashHistory.push("/login");
    }
  }

  render () {
    let sessionButton;
    if (this.props.currentUser) {
      sessionButton = (
        <ul className="logout-profile">
          <li><button className="logout-button" onClick={this.props.logout}>Log Out</button></li>
          <li><img className="header-profile-picture"
            src="http://res.cloudinary.com/dj6gqauyi/image/upload/v1472591120/jeff-goldblum-2016_eedzlh.jpg"
            alt="" /></li>
          <li><img className="plus" src="http://res.cloudinary.com/dj6gqauyi/image/upload/v1472582322/plus_spuhvk.png" /></li>
        </ul>
      );
    } else {
      sessionButton = (<ul className="login-signup">
        <li><Link to="/login" onClick = {this.props.clearErrors} className="current">Login</Link></li>
        <li><Link to="/signup" onClick = {this.props.clearErrors} className="current">Sign up</Link></li>
      </ul>);
    }
    return(
      <div className="nav-header">
        <Link to="/" className="header-link"><h1>takeupless</h1></Link>
        <div>{sessionButton}</div>
      </div>
    );
  }
}

export default Navbar;