import { createBrowserRouter } from "react-router";
import App from "./App";
import Game from "./pages/Game";
import Home from "./pages/Home";
import MarauderMapClose from "./pages/MarauderMapClose";
import Rules from "./pages/Rules";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/rules",
				element: <Rules />,
			},
			{
				path: "/game",
				element: <Game />,
			},
			{
				path: "/marauder-map",
				element: <MarauderMapClose />,
			},
			{
				path: "/marauder-map/rules",
				element: <Rules />,
			},
		],
	},
]);

export default router;
