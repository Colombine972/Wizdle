import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import marauderMapDroite from "../assets/images/marauder-map-droite.jpg";
import marauderMapGauche from "../assets/images/marauder-map-gauche.jpg";
import parcheminVide from "../assets/images/parchemin-vide.webp";
import "../styles/Rules.css";

function Rules() {
	const [showParchment, setShowParchment] = useState(false);
	const [answerOath, setAnswerOath] = useState("");
	const [errorOath, setErrorOath] = useState("");
	const [validOath, setValidOath] = useState(false);
	const navigate = useNavigate();
	const requiredOath =
		"je jure solennellement que mes intentions sont mauvaises";

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
										className="parchment-input"
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
									<div className="magic-text">
										📜 Règles du jeu Bienvenue jeune sorcier ! Le but du jeu est
										simple : trouve le personnage mystère du jour ! Toutes tes
										tentatives seront affichées et comparées avec le personnage
										secret… Bonne chance, et que la magie soit avec toi ✨
									</div>
									<button
										type="button"
										title="ouvrir la carte du marauder"
										onClick={() => navigate("/game")}
									>
										A toi de jouer, sorcier !
									</button>
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
