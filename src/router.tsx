import { createBrowserRouter } from "react-router";
import App from "./App";
import Game from "./pages/Game";
import Home from "./pages/Home";
import MarauderMapClosed from "./pages/MarauderMapClosed";
import Rules from "./pages/Rules";
import Training from "./pages/Training";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/game",
				element: <Game />,
			},
			{
				path: "/training",
				element: <Training />,
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
