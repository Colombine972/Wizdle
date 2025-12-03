import moment from "moment";
import "../styles/score.css";
import { useMemo, useState } from "react";
import banner from "../assets/images/banniere.png";
import { useUsername } from "../contexts/UsernameContext";
import imgCastle from "../images/carte-chateau.png";
import imgCroix from "../images/croix.svg";
import imgSablier from "../images/sablier.svg";
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
		10500 - timeBis * 0.1 - tentativeBis * 500 - indiceBis,
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
					<article>
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
						<article>
							<div className="character-card-header">
								<h2>{todayCharacter.nom}</h2>
								<button
									type="button"
									className="character-card-button"
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
													espece :
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
							<button
								type="button"
								className="daily-ranking-button"
								onClick={() => setOpenDailyRanking((prev) => !prev)}
							>
								{openDailyRanking ? "-" : "+"}
							</button>

							{openDailyRanking && (
								<div className="character-card-header">
									<img src={banner} alt="banniere de victoire" />
									<table>
										<caption>CLASSEMENT</caption>
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
								</div>
							)}
						</article>
					)}
				</div>
			</div>
		</section>
	);
}
export default Score;
