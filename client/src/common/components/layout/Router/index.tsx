import { Routes, Route } from "react-router-dom";
import PageHome from "../../../../pages/pageHome";
import PageGame from "../../../../pages/pageGame";
import PageAbout from "../../../../pages/pageAbout";
import PageInfo from "../../../../pages/pageInfo";

import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PageHome />} />
            <Route path="/game/:playerId" element={<PageGame />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/info" element={<PageInfo />} />
        </>
    )
);


const Router = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default Router;