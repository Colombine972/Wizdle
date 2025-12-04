import moment from "moment";
import "../styles/Score.css";
import { useMemo, useState } from "react";
import banner from "/images/banniere.png";
import imgCastle from "/images/carte-chateau.png";
import goblet from "/images/coupe.png";
import imgCroix from "/images/croix.svg";
import imgSablier from "/images/sablier.svg";
import { useUsername } from "../contexts/UsernameContext";
import type { Character } from "../interfaces/interfaces";
import otherPlayersData from "../otherPlayers.json";

type Player = {
	id: string;
	name: string;
	score: number;
};

type ScoreProps = {
	time: number;
	usedClue: boolean;
	attemptCount: number;
	todayCharacter: Character | undefined;
	setScoreView: React.Dispatch<React.SetStateAction<boolean>>;
};

const tableHouses = ["Gryffondor", "Poufsouffle", "Serdaigle", "Serpentard"];
const house = tableHouses[Math.floor(Math.random() * tableHouses.length)];

const otherPlayers = otherPlayersData as Player[];

const rankLabels = [
	"🥇Première place :",
	"🥈Deuxième place :",
	"🥉Troisième place :",
	"  Quatrième place :",
	"  Cinquième place :",
];

function Score({
	time,
	usedClue,
	attemptCount,
	todayCharacter,
	setScoreView,
}: ScoreProps) {
	const { username } = useUsername();
	const timeBis = Number(time) || 0;
	const displayTime = moment.utc(timeBis).format("HH:mm:ss");
	const tentativeBis = Number(attemptCount) || 0;
	const indiceBis = usedClue ? 500 : 0;
	let score = Math.floor(
		10500 - timeBis * 0.01 - tentativeBis * 500 - indiceBis,
	);

	if (score < 0) {
		score = 0;
	}

	const [openCharacterCard, setOpenCharacterCard] = useState(false);
	const [openDailyRanking, setOpenDailyRanking] = useState(false);

	const sortedRanking = useMemo<Player[]>(
		() =>
			[
				...otherPlayers,
				{
					id: "06" /*see, how generate ID */,
					name: username || "Sorcier(e)",
					score,
				},
			].sort((a, b) => b.score - a.score),
		[username, score],
	);

	return (
		<section id="popop-score">
			<div className="popup-container">
				<img src={imgCastle} alt="Chateau" className="bg-img" />

				<img
					src={imgCroix}
					alt="Une croix"
					className="close-btn"
					onClick={() => setScoreView(false)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ")
							setScoreView(false);
					}}
				/>
				<div className="scroll-div">
					<article className="score-article">
						<h2>MAGISTRAL !</h2>
						<p>{score} pts</p>
						<p>pour {house}</p>
						<div>
							<img src={imgSablier} alt="Un sablier" />
							<p>{displayTime}</p>
						</div>
						<div>
							<p>
								Indice utilisé :<span>{usedClue ? "oui" : "non"}</span>
							</p>
							<p>
								Tentatives :<span>{attemptCount}</span>
							</p>
						</div>
					</article>

					{todayCharacter && (
						<article className="character-card-article">
							<div className="character-card-header">
								<h2>{todayCharacter.nom}</h2>
								<button
									type="button"
									className="open-card-button"
									onClick={() => setOpenCharacterCard((prev) => !prev)}
								>
									{openCharacterCard ? "-" : "+"}
								</button>
							</div>
							{openCharacterCard && (
								<div className="character-card-body-container">
									<img src={todayCharacter.image} alt="characterToFind.nom" />
									<table>
										<tbody>
											<tr>
												<th scope="row" className="align-to-right ">
													Espece :
												</th>
												<td>{todayCharacter.espece || "inconnue"}</td>
											</tr>
											<tr>
												<th scope="row" className="align-to-right ">
													Genre :
												</th>
												<td>{todayCharacter.genre || "inconnu"}</td>
											</tr>
											<tr>
												<th scope="row" className="align-to-right ">
													Maison :
												</th>
												<td>{todayCharacter.maison || "inconnue"}</td>
											</tr>
											<tr>
												<th scope="row" className="align-to-right ">
													Ascendance :
												</th>
												<td>{todayCharacter.ascendance || "inconnue"}</td>
											</tr>
											<tr>
												<th scope="row" className="align-to-right ">
													En vie :
												</th>
												<td>
													{todayCharacter.vivant === true
														? "oui"
														: todayCharacter.vivant === false
															? "non"
															: "non défini"}
												</td>
											</tr>
											<tr>
												<th scope="row" className="align-to-right ">
													Cheveux :
												</th>
												<td>{todayCharacter.couleur_cheveux || "inconnue"}</td>
											</tr>
										</tbody>
									</table>
								</div>
							)}
						</article>
					)}
					{todayCharacter && (
						<article>
							{openDailyRanking && (
								<div className="img-classment">
									<img
										src={banner}
										alt="banniere de victoire"
										className="banniere"
									/>
									<img
										src={goblet}
										alt="coupe des 3 sorciers"
										className="goblet"
									/>
									<img
										src={banner}
										alt="banniere de victoire"
										className="banniere"
									/>
								</div>
							)}
							<div className="character-card-header">
								<h2>Classement</h2>
								<button
									type="button"
									className="open-card-button"
									onClick={() => setOpenDailyRanking((prev) => !prev)}
								>
									{openDailyRanking ? "-" : "+"}
								</button>
							</div>
							{openDailyRanking && (
								<table className="table-ranking">
									<tbody>
										{rankLabels.map((label, index) => {
											const player = sortedRanking[index];
											if (!player) return null;
											return (
												<tr key={label}>
													<th scope="row">{label}</th>
													<td>
														{player.name}, {player.score} points
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							)}
						</article>
					)}
				</div>
			</div>
		</section>
	);
}
export default Score;
