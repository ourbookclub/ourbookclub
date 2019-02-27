import React from 'react';

import { withFirebase } from './Firebase';

const textsize = {
  fontSize:"15px"
}

const SignOutButton = ({ firebase }) => (
  <button style={textsize} className="btn btn-link" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);