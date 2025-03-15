import {Container} from "react-bootstrap";
import {Navbar} from "./Components/Navbar.jsx";
import {useEffect, useState} from "react";
import Shop from "./components/Shop.jsx";
function App() {

    return (
        <Container>
            <Navbar/>
            <Shop />
        </Container>
    )
}

export default App
