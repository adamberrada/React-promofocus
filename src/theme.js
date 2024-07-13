import React, {useState , useEffect, createContext} from "react";
/*import lightTheme from "./items/lightThemes.json";
import darkTheme from "./items/darkThemes.json";
*/

const lightTheme = {
    color: "#000000",
    buttonColor: "gold",
    buttonTextColor: "#000000",
    border : "2px solid black"
}
const darkTheme = {
    backgoundFont: 'black',
    color: "#FFD700",
    buttonColor: "black",
    buttonTextColor: "gold",
    border: "2px solid gold"
}
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme? darkTheme : lightTheme))
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('app-theme', theme === darkTheme ? 'dark' : 'light');
    }, [theme])

    return(
        <ThemeContext.Provider value={{ theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeProvider , ThemeContext };



