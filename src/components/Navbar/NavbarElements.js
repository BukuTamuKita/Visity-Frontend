import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Nav = styled.nav`
    background: transparent;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    margin-top: 3rem;
    margin-bottom: 4rem;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`
// Kalau punya logo
// export const NavLogo = styled(LinkR)`
//     color: red;
//     justify-content: flex-start;
//     cursor: pointer;
//     font-size: 1.5rem;
//     display: flex;
//     align-items: center;
//     margin-left: 24px;
//     font-weight: bold;
//     text-decoration: none;
// `

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: black;
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavItem = styled.li`
    height: 3rem;
    width: 16rem;
    margin: 0 10px;
`

export const NavLink = styled(Link)`
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #782CE8;
        border-bottom: 3px solid #782CE8;
        outline: none;
    }
`