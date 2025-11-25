import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import { ClueProvider } from "./utils/ClueContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<ClueProvider>
			<RouterProvider router={router} />
		</ClueProvider>,
	);
}
