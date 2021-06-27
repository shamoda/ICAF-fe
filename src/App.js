import React from "react";
import ReactDoM from "react-dom";
import NotSuppoted from "./component/NotSupported/NotSupported";
import FrontEnd from "./component/FrontEnd";
import "./App.css"

const App = () => {
    return (
        <div>
            <div className="mobile">
                <NotSuppoted />
            </div>
            <div className="web">
                <FrontEnd />
            </div>
        </div>
    )//test
}

ReactDoM.render(<App />, document.getElementById("root"))