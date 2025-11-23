import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import indice from "../assets/images/indice.webp";
import marauderMapDroite from "../assets/images/marauder-map-droite.jpg";
import marauderMapGauche from "../assets/images/marauder-map-gauche.jpg";
import parcheminVide from "../assets/images/parchemin-vide.webp";
import validationSerment from "../assets/images/validation-serment2.png";
import "../styles/Rules.css";

const fullText = `🪄 Règles du jeu – 

WIZDLE est un jeu de déduction dans l’univers d’Harry Potter.

Chaque jour, un personnage mystère est choisi aléatoirement.
Votre mission est de le deviner en un minimum d’essais et de temps.

Choisissez un personnage via la barre de recherche et validez votre tentative.

Un tableau affiche les retours pour chaque caractéristique : espèce, genre, sang, maison, statut de vie et cheveux.

🟩 Vert = la caractéristique est correcte.

🟥 Rouge = elle est incorrecte.

Affinez vos choix en fonction des retours.

Un bouton Indice apparaît après plusieurs essais et révèle la première lettre du prénom (mais réduit le score).

Votre score final dépend des tentatives, du temps et de l’usage de l’indice.`;

function Rules() {
	const [showParchment, setShowParchment] = useState(false);
	const [answerOath, setAnswerOath] = useState("");
	const [errorOath, setErrorOath] = useState("");
	const [validOath, setValidOath] = useState(false);
	const [gameButton, setGameButton] = useState(false);
	const [showClue, setShowClue] = useState(false);
	const [displayedText, setDisplayedText] = useState("");
	const navigate = useNavigate();
	const requiredOath =
		"je jure solennellement que mes intentions sont mauvaises";

	useEffect(() => {
		setTimeout(() => setShowParchment(true), 1200);
	}, []);

	const normalize = useCallback((text: string) => {
		return text
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")
			.replace(/[.,!?;:'"]/g, "")
			.toLowerCase();
	}, []);

	const oathValidate = () => {
		if (normalize(answerOath) === normalize(requiredOath)) {
			setValidOath(true);
			setErrorOath("");
		} else {
			setValidOath(false);
			setErrorOath(
				"Pense à regarder de nouveau Harry Potter ... Un indice t'attend juste en dessous",
			);
		}
	};

	const handleShowClue = () => {
		setShowClue(true);
	};

	useEffect(() => {
		if (validOath) {
			let i = 0;
			const interval = setInterval(() => {
				setDisplayedText(fullText.slice(0, i));
				i++;
				if (i > fullText.length) {
					clearInterval(interval);
					setGameButton(true);
				}
			}, 10);
		}
	}, [validOath]);

	return (
		<main className="marauder-open-container">
			<section className="marauder-open-map">
				<img
					src={marauderMapGauche}
					alt="cote gauche de la carte"
					className="map-left-half"
				/>
				<img
					src={marauderMapDroite}
					alt="cote droit de la carte"
					className="map-right-half"
				/>
				{showParchment && (
					<article
						className={`parchment-container ${validOath ? "magic-glow" : ""}`}
					>
						<img
							src={parcheminVide}
							alt="parchemin"
							className="parchment-image"
						/>
						<div className="serment-container">
							{!validOath && (
								<>
									<textarea
										className="parchment-textarea"
										placeholder="Prononce le serment..."
										value={answerOath}
										onChange={(e) => {
											setAnswerOath(e.target.value);
											setErrorOath("");
										}}
									/>
									<button
										className="button-reset"
										type="button"
										title="Valide le serment"
										onClick={oathValidate}
									>
										<img
											src={validationSerment}
											alt="validation serment"
											className="validation-image"
										/>
									</button>
									<p className={`error-msg ${errorOath ? "visible" : ""}`}>
										{errorOath}
									</p>
									<div className="crystal-section">
										<button
											className="button-reset"
											type="button"
											title="Affiche un indice"
											onClick={handleShowClue}
										>
											<img src={indice} alt="indice" className="clue-image" />
										</button>
										<p className={`error-msg ${showClue ? "visible" : ""}`}>
											{requiredOath}
										</p>
									</div>
								</>
							)}
							{validOath && (
								<section className="rules-container">
									<div className="rules-scroll">
										<p className="magic-text">{displayedText}</p>
									</div>
									{gameButton && (
										<button
											type="button"
											title="accès au jeu"
											onClick={() => navigate("/game")}
											className="game-button"
										>
											A toi de jouer, sorcier !
										</button>
									)}
								</section>
							)}
						</div>
					</article>
				)}
			</section>
		</main>
	);
}
export default Rules;
