import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class NavbarMenu extends Component{
    render(){
        return(
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
            <Link to='/' className='nav-link'>Exercises</Link>
            <Link to='/create' className='nav-link'>Create Exercise Log</Link>
            <Link to='/user' className='nav-link'>Create User</Link>
            </nav>
        );
    }
};

export default NavbarMenu;