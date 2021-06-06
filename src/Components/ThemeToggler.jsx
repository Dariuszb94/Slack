import React, {useContext} from "react";
import ThemeContext from "./ThemeContext";
import Sun from '@material-ui/icons/WbSunny';
import Moon from '@material-ui/icons/Brightness2';
const themeTogglerStyle = {
    cursor: "pointer"
}
const ThemeToggler = () => {
    const[themeMode, setThemeMode] = useContext(ThemeContext);
        return(
            <div style = {themeTogglerStyle} onClick = {() => {setThemeMode(themeMode === "light"? "dark": "light")}}>
            <div title = "switch theme">
                {/* {themeMode === "dark" ? "☾" : "☼"} */}
                {themeMode=== "dark" ? <Sun/>: <Moon />}
            </div>
        </div>
    );
}

export default ThemeToggler;