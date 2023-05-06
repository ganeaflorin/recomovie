import { createBrowserRouter } from "react-router-dom";
import paths from "./common/paths";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecommendationList from "./pages/RecommendationList";

const router = createBrowserRouter([
    {
        path: paths.register,
        element: <Register />
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