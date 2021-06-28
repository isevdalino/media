import { Link, useHistory } from 'react-router-dom';
import { HOME, SIGN_IN, SIGN_UP } from '../../constants/Paths';
import SearchBar from '../search/SearchBar';
import { isUserLoggedIn, loginVisibilityStyleSheet, logoutVisibilityStyleSheet, onLogoutClick } from '../login/logoutHandler';
import { useEffect } from 'react';

function ToolbarComponent({ isUserLoggedInState, setIsUserLoggedInState }) {
    useEffect(() => {
        const loggedIn = isUserLoggedIn();
        setIsUserLoggedInState(loggedIn);
    }, []);

    const history = useHistory();

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={HOME}>Media</Link>
                <div className="collapse navbar-collapse navigation-bar">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" style={loginVisibilityStyleSheet(isUserLoggedInState)} to={SIGN_IN}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={loginVisibilityStyleSheet(isUserLoggedInState)} to={SIGN_UP}>Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link logout-button-style" style={logoutVisibilityStyleSheet(isUserLoggedInState)} onClick={() => { onLogoutClick(history,HOME, setIsUserLoggedInState) }}>Logout</button>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <SearchBar />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export { ToolbarComponent };