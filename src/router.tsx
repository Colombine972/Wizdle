import { createBrowserRouter } from "react-router";
import App from "./App";
import Game from "./pages/Game";
import Home from "./pages/Home";
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
				path: "/rules",
				element: <Rules />,
			},
			{
				path: "/game",
				element: <Game />,
			},
			{
				path: "/training",
				element: <Training />,
			},
		],
	},
]);

export default router;
