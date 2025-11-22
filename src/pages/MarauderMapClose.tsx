import { useNavigate } from "react-router";
import parcheminClose from "../assets/images/marauder-map-close.jpg";
import "../styles/MarauderMapClose.css";

function MarauderMapClose() {
	const navigate = useNavigate();

	return (
		<main className="marauder-container">
			<button
				className="button-reset"
				type="button"
				title="ouvrir la carte du marauder"
				onClick={() => navigate("/marauder-map/rules")}
			>
				<img
					className="marauder-map"
					src={parcheminClose}
					alt="carte du marauder"
				/>
			</button>
		</main>
	);
}
export default MarauderMapClose;
