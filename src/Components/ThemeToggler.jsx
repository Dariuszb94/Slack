import React, {useContext} from "react";
import ThemeContext from "./ThemeContext";

const themeTogglerStyle = {
    cursor: "pointer"
}
const ThemeToggler = () => {
    const[themeMode, setThemeMode] = useContext(ThemeContext);
        return(
            <div style = {themeTogglerStyle} onClick = {() => {setThemeMode(themeMode === "light"? "dark": "light")}}>
            <span title = "switch theme">
                {themeMode === "dark" ? "☾" : "☼"}
            </span>
        </div>
    );
}

export default ThemeToggler;