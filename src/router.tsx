import { createBrowserRouter } from "react-router";
import App from "./App";
import Game from "./pages/Game";
import Home from "./pages/Home";
import MarauderMapClosed from "./pages/MarauderMapClosed";
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
				element: <MarauderMapClosed />,
			},
			{
				path: "/marauder-map/rules",
				element: <Rules />,
			},
		],
	},
]);

export default router;
