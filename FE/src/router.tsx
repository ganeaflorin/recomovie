import { createBrowserRouter } from "react-router-dom";
import paths from "./common/paths";
import Login from "./pages/Login";
import RecommendationList from "./pages/RecommendationList";
import SignUp from "./pages/SignUp";
import ConfirmationToken from "./pages/ConfirmationToken";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import Friends from "./pages/Friends";
import Forbidden from "./pages/Forbidden";
import UserProfile from "./pages/UserProfile";

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
                        path: paths.playlists + "/:userId?",
                        element: <Playlists />
                    },
                    {
                        path: paths.profile + "/:userId",
                        element: <UserProfile />
                    },
                    {
                        path: paths.myFriends,
                        element: <Friends />
                    },
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
                    {
                        path: paths.forbidden,
                        element: <Forbidden />
                    }
                ]
        },
    ]);
export default router;