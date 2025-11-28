import { Link } from "react-router";
import "../styles/Home.css";
import StartGameButton from "../components/StartGameButton";

function Home() {
	return (
		<>
			<h1 className="home-title">
				Le parchemin s’ouvre devant toi...
				<br />
				sauras-tu percer ses mystères ?
			</h1>
			<section className="home-section">
				<Link to="/marauder-map">
					<button type="button">
						<img
							src="./src/assets/images/parchemin-regles.png"
							alt="parchemin règles"
						/>
						Le Grimoire des Règles
					</button>
				</Link>
				<StartGameButton />
				<Link to="/training">
					<button type="button">
						<img src="./src/assets/images/logo-vif-dor.png" alt="vif d'or" />
						Révises tes BUSE
					</button>
				</Link>
			</section>
		</>
	);
}
export default Home;
