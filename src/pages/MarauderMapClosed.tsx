import { useNavigate } from "react-router";
import parcheminClose from "/images/marauder-map-close.jpg";
import "../styles/MarauderMapClosed.css";

function MarauderMapClosed() {
	const navigate = useNavigate();

	return (
		<div className="marauder-container">
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
		</div>
	);
}
export default MarauderMapClosed;
