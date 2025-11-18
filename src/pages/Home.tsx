import { Link } from "react-router";

function Home() {
	return (
		<div className="button-grimoire">
			<button type="button">
				<Link to="/marauder-map/"> Le grimoire des règles</Link>
			</button>
		</div>
	);
}
export default Home;
