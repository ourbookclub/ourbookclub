import React from 'react';

const ButtonStyle ={
    fontSize: '25px',
    
    

}

const GroupNav = (props) => {
    return (
        <div align="center" >
            <button className='btn btn-success' style={ButtonStyle} onClick={() => props.updatePage('main')}>Show Club Page</button>
            <button className='btn btn-success' style={ButtonStyle} onClick={() => props.updatePage('updateBook')}>Update Book</button>
            <button className='btn btn-success' style={ButtonStyle} onClick={() => props.updatePage('addUser')}>Add User</button>
        </div>
    )
}

export default GroupNav;