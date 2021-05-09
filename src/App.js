import React from "react";
import ReactDoM from "react-dom";
import FrontEnd from "./component/FrontEnd";

const App = () => {
    return (
        <FrontEnd/>
    )
}

ReactDoM.render(<App/>, document.getElementById("root"))