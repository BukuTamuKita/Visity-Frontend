import React from 'react';
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="/search" onClick={toggle}>Search User</SidebarLink>
                    <SidebarLink to="/user" onClick={toggle}>User Administration</SidebarLink>
                    <SidebarLink to="/history" onClick={toggle}>Appointment History</SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
};

export default Sidebar;
