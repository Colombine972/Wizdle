import { Outlet } from "react-router";
import "./styles/reset.css";
import "./styles/variable.css";
import "./styles/App.css";
import Header from "./components/Header";
import { ClueProvider } from "./utils/ClueContext";

function App() {
	return (
		<ClueProvider>
			<div className="background">
				<aside>
					<figure>
						<audio controls>
							<source
								src="./src/assets/media/harry-potter-generique.mp3"
								type="audio/mpeg"
							/>
							<track
								src="./src/assets/media/harry-potter-generique.vtt"
								kind="captions"
								srcLang="fr"
								label="Transcription audio"
							/>
							Votre navigateur ne supporte pas la balise audio.
						</audio>
						<figcaption>Génerique Harry Potter</figcaption>
					</figure>
				</aside>
				<Header />
				<main>
					<Outlet />
				</main>
			</div>
		</ClueProvider>
	);
}

export default App;
