import { Routes, Route } from "react-router-dom";
import PageHome from "../../../../pages/pageHome";
import PageGame from "../../../../pages/pageGame";
import PageAbout from "../../../../pages/pageAbout";
import PageInfo from "../../../../pages/pageInfo";


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/game" element={<PageGame />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/info" element={<PageInfo />} />
        </Routes>
    );
}

export default Router;