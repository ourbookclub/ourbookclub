import React from 'react';

const GroupNav = (props) => {
    return (
        <div>
            <button className='btn btn-success' onClick={() => props.updatePage('main')}>Show Club Page</button>
            <button className='btn btn-success' onClick={() => props.updatePage('updateBook')}>Update / Add Book</button>
            <button className='btn btn-success' onClick={() => props.updatePage('addUser')}>Add User</button>
        </div>
    )
}

export default GroupNav;