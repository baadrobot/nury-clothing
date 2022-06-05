import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../cart-icon/cart-icon.component";
import CardDropdown from "../../card-dropdown/card-dropdown.component";

import { ReactComponent as CrownLogo } from "../../../assets/crown-logo.svg";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <div className="logo">
                    <CrownLogo/>
                </div>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {currentUser 
                    ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                    )
                    : (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                    )
                }
                <CartIcon/>
            </div>
            {/* Если первое и второе выражение true, 
            то вернуть/инициализировать то что передано последним выражением(CardDropdown), 
            К к слову компоненты всегда возвращают true потому что это функции */}
            {isCartOpen && <CardDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;
