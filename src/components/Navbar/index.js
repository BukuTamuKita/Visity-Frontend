import React from 'react';
import { FaBars } from 'react-icons/fa';
import { 
    Nav, 
    NavbarContainer,
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLink 
} from './NavbarElements';

const Navbar = ({ toggle }) => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>

                    <NavMenu>
                        <NavItem>
                            <NavLink to="/search" activeClassName="active">Search User</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/user">User Administration</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/history">Appointment History</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/testing">Testing</NavLink>
                        </NavItem>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    );
}

export default Navbar;