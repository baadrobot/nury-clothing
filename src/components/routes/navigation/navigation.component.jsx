import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../cart-icon/cart-icon.component";
import CardDropdown from "../../card-dropdown/card-dropdown.component";

import { ReactComponent as CrownLogo } from "../../../assets/crown-logo.svg";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

import {NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <div className="logo">
                    <CrownLogo/>
                </div>
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {currentUser 
                    ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    )
                    : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )
                }
                <CartIcon/>
            </NavLinks>
            {/* Если первое и второе выражение true, 
            то вернуть/инициализировать то что передано последним выражением(CardDropdown), 
            К к слову компоненты всегда возвращают true потому что это функции */}
            {isCartOpen && <CardDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;
