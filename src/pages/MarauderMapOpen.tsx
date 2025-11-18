import { useNavigate } from "react-router";
import parchemin from "../assets/images/parchemin-ouvert.svg";

function MarauderMapOpen() {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			onClick={() => navigate("/marauder-map/rules")}
			className="marouder-map-close"
		>
			<img src={parchemin} alt="marouder card" />
		</button>
	);
}
export default MarauderMapOpen;
