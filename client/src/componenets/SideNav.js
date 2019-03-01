import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';

import { slide as Menu } from 'react-burger-menu'

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default Example;