import { Link } from "react-router";
import "../styles/Home.css";

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
						<img src="/images/parchemin-regles.png" alt="parchemin règles" />
						Le Grimoire des Règles
					</button>
				</Link>
				<Link to="/game">
					<button type="button">
						<img src="/images/baguette-magique.png" alt="baguette magique" />À
						toi de jouer, sorcier !
					</button>
				</Link>
				<Link to="/training">
					<button type="button">
						<img src="/images/logo-vif-dor.png" alt="vif d'or" />
						Révises tes BUSE
					</button>
				</Link>
			</section>
		</>
	);
}
export default Home;
