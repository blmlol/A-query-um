import React, { useLayoutEffect, useState } from 'react';
import { Navbar, Icon, NavItem, SideNavItem } from 'react-materialize';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import Logout from './Logout';
import Profile from './Profile';
import API from "../utils/API";

function Nav() {

    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null)

    const updateUser = function (userObject) {
        const { loggedIn, username } = userObject;
        setLogged(loggedIn);
        setUser(username);
    }

    useLayoutEffect(() => {
        API.isAuthenticated().then(function (response) {
            updateUser({
                loggedIn: response.data.loggedIn,
                username: (response.data.user) ? response.data.user.firstName : ""
            });
        });
    })

    return (
        logged ?
            (
                <>
                    {
                        <Navbar className="grey darken-4"
                            alignLinks="right"
                            brand={<a className="brand-logo" href="/"><img src="/images/logo3.png" /></a>}
                            centerLogo
                            menuIcon={<Icon>menu</Icon>}
                            centerChildren="1"
                            options={{
                                draggable: true,
                                edge: 'left',
                                inDuration: 250,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 200,
                                preventScrolling: true
                            }}

                            sidenav={
                                <>
                                    <SideNavItem
                                        user={{
                                            background: "../images/userbg01.jpg",
                                            email: "iamemailaddress",
                                            image: 'static/media/react-materialize-logo.824c6ea3.svg',
                                            name: 'John Doe'
                                        }}
                                        userView
                                    />
                                    <SideNavItem
                                        href="/"
                                        waves
                                    >
                                        Home
                                    </SideNavItem>
                                    <SideNavItem
                                        href="/profile"
                                        waves
                                    >
                                        My Profile
                                    </SideNavItem>
                                    <SideNavItem
                                        href="/aqueryum/create"
                                        waves
                                    >
                                        My Aquarium
                                    </SideNavItem>
                                    <SideNavItem divider />
                                    <SideNavItem subheader>
                                        <Logout />
                                    </SideNavItem>

                                </>
                            }>

                            <NavItem>
                                <Profile />
                            </NavItem>
                            <NavItem href="/">
                                <Logout updateUser={updateUser} name={user} />
                            </NavItem>

                        </Navbar>
                    }
                </>
            ) :

            (<Navbar className="grey darken-4"
                alignLinks="right"
                brand={<a className="brand-logo" href="/"><img src="/images/logo3.png" /></a>}
                centerLogo
                menuIcon={<Icon>menu</Icon>}
                centerChildren="1"
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}>
                <NavItem href="/">
                    <LoginModal updateUser={updateUser} />
                </NavItem>
                <NavItem href="/">
                    <SignUpModal updateUser={updateUser} />
                </NavItem>
            </Navbar>)
    );
}

export default Nav;
