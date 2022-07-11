import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import CartIcon from "../../cart-icon/cart-icon.component";
import CardDropdown from "../../card-dropdown/card-dropdown.component";

import { ReactComponent as CrownLogo } from "../../../assets/crown-logo.svg";

import { selectIsCartOpen } from "../../../store/cart/cart.selector";
import { selectCurrentUser } from "../../../store/user/user.selector";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

import {NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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
