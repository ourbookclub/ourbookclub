import React from 'react';
import { Button } from 'reactstrap';

const ButtonStyle ={
    fontSize: '17px',
    
    

}

const GroupNav = (props) => {
    return (
        <div align="center" >
           <Button outline color="primary" style={ButtonStyle} onClick={() => props.updatePage('main')}>Show Club Page</Button>
           <Button outline color="primary" style={ButtonStyle} onClick={() => props.updatePage('updateBook')}>Update Book</Button>
           <Button outline color="primary" style={ButtonStyle} onClick={() => props.updatePage('addUser')}>Add User</Button>
        </div>
    )
}

export default GroupNav;