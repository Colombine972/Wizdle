import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { ClueProvider } from "./contexts/ClueContext";
import { UsernameProvider } from "./contexts/UsernameContext";
import router from "./router";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<UsernameProvider>
			<ClueProvider>
				<RouterProvider router={router} />
			</ClueProvider>
		</UsernameProvider>,
	);
}
