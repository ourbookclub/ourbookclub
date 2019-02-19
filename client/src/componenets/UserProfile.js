import React from 'react';
import { withAuthorization } from './Session';

import { PasswordResetForm } from './PasswordReset';
import PasswordChangeForm from './PasswordChange';

const UserProfile = () => (
    <div>
        <h1>Profile Page</h1>
        {/* TODO THis needs to be updated totally */}
        <PasswordResetForm />
        <PasswordChangeForm />
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserProfile);