import { createBrowserRouter } from "react-router-dom";
import paths from "./common/paths";
import Login from "./pages/Login";
import RecommendationList from "./pages/RecommendationList";
import SignUp from "./pages/SignUp";
import ConfirmationToken from "./pages/ConfirmationToken";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";

const router = createBrowserRouter(
    [
        {
            path: paths.root,
            element: <Layout />,
            children:
                [
                    {
                        path: paths.recommendations,
                        element: <RecommendationList />
                    },
                    {
                        path: paths.myPlaylists,
                        element: <Playlists />
                    }
                ]
        },
        {
            path: paths.root,
            element: <Layout />,
            children: [
                {
                    path: paths.home,
                    element: <Home />
                },
                {
                    path: paths.signUp,
                    element: <SignUp />
                },
                {
                    path: paths.confirmationToken,
                    element: <ConfirmationToken />
                },
                {
                    path: paths.login,
                    element: <Login />
                },
            ]
        }

    ]);
export default router;