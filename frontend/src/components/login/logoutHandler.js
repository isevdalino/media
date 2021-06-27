import { USER_EMAIL_LOCAL_STORAGE_KEY, USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY } from "../../constants/constants";
import { HOME } from "../../constants/Paths";

function onLogoutClick(history, setIsUserLoggedInState) {
    console.log("Logout ...");
    localStorage.removeItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(USER_EMAIL_LOCAL_STORAGE_KEY);
    setIsUserLoggedInState(false);
    history.push(HOME);
};

function isUserLoggedIn() {
    return localStorage.getItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY) != null &&
        localStorage.getItem(USER_EMAIL_LOCAL_STORAGE_KEY) != null;
}

function loginVisibilityStyleSheet(isUserLoggedIn) {
    return isUserLoggedIn ?
        {
            visibility: "hidden",
        }
        :
        {
            visibility: "visible",
        };
};

function logoutVisibilityStyleSheet(isUserLoggedIn) {
    return isUserLoggedIn ?
        {
            visibility: "visible",
        }
        :
        {
            visibility: "hidden",
        };
};

export { onLogoutClick, isUserLoggedIn, loginVisibilityStyleSheet, logoutVisibilityStyleSheet };