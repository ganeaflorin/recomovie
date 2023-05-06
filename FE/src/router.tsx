import { createBrowserRouter } from "react-router-dom";
import paths from "./common/paths";
import Login from "./pages/Login";
import RecommendationList from "./pages/RecommendationList";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
    {
        path: paths.signUp,
        element: <SignUp />
    },
    {
        path: paths.login,
        element: <Login />
    },
    {
        path: paths.recommendations,
        element: <RecommendationList />
    }
])

export default router;