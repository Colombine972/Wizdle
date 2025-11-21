import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import marauderMapDroite from "../assets/images/marauder-map-droite.jpg";
import marauderMapGauche from "../assets/images/marauder-map-gauche.jpg";
import parcheminVide from "../assets/images/parchemin-vide.webp";
import "../styles/Rules.css";

const fullText = `🪄 Règles du jeu – WIZDLE : Le défi des sorciers

WIZDLE est un jeu de déduction basé sur l’univers d’Harry Potter.

Le but est de trouver le personnage mystère du jour.

Un nouveau personnage est choisi chaque jour de manière aléatoire.

Vous devez deviner en un minimum d’essais et de temps.

Chaque personnage possède plusieurs caractéristiques à analyser : espèce, genre, sang, maison, statut de vie, cheveux.

À chaque tentative, un tableau affiche votre réponse et les retours.

🟩 Vert signifie que la caractéristique est correcte.

🟥 Rouge signifie que la caractéristique est incorrecte.

La recherche s’effectue dans une barre dédiée avec une liste de suggestions.
Vous validez un personnage pour obtenir immédiatement les indices colorés.

Vous ajustez ensuite vos suppositions en fonction des retours.

Un bouton Indice apparaît après un certain nombre d’essais.
L’indice révèle la première lettre du prénom mais réduit votre score final.

Le score dépend du nombre de tentatives, du temps écoulé et de l’usage de l’indice.

Des modes supplémentaires existent : partie du jour, partie de la veille, calendrier, et classement journalier.`;

function Rules() {
	const [showParchment, setShowParchment] = useState(false);
	const [answerOath, setAnswerOath] = useState("");
	const [errorOath, setErrorOath] = useState("");
	const [validOath, setValidOath] = useState(false);
	const [gameButton, setGameButton] = useState(false);
	const navigate = useNavigate();
	const requiredOath =
		"je jure solennellement que mes intentions sont mauvaises";

	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		setTimeout(() => setShowParchment(true), 1200);
	}, []);

	const normalize = useCallback(
		(text: string) =>
			text
				.normalize("NFD")
				.replace(/\p{Diacritic}/gu, "")
				.replace(/[.,!?;:'"]/g, "")
				.toLowerCase(),
		[],
	);

	useEffect(() => {
		if (normalize(answerOath) === normalize(requiredOath)) {
			setValidOath(true);
		}
	}, [answerOath, normalize]);

	useEffect(() => {
		if (!validOath) return;

		let i = 0;
		const interval = setInterval(() => {
			setDisplayedText(fullText.slice(0, i));
			i++;
			if (i > fullText.length) {
				clearInterval(interval);
				setGameButton(true); // ton bouton apparaît après
			}
		}, 20); // vitesse d’écriture
	}, [validOath]);

	return (
		<div className="marauder-open-container">
			<div className="marauder-open-map">
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
					<div
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
									<p className={`error-msg ${errorOath ? "visible" : ""}`}>
										{errorOath}
									</p>
								</>
							)}
							{validOath && (
								<div className="rules-container">
									<div className="rules-scroll">
										<div className="magic-text">{displayedText}</div>
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
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
export default Rules;
