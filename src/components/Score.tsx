import moment from "moment";
import "../styles/score.css";
import "../styles/scoreResponsive.css";
import { useMemo, useState } from "react";
import banner from "../assets/images/banniere.png";
import imgCoix from "../images/croix.svg";
import imgSablier from "../images/sablier.svg";
import type { Character } from "../interfaces/interfaces";

import otherPlayers from "../otherPlayers.json";

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
	fakeCurrentPlayer: Player;
};

const tableHouses = ["Gryffondor", "Poufsouffle", "Serdaigle", "Serpentard"];
const house = tableHouses[Math.floor(Math.random() * tableHouses.length)];

const rankLabels = [
	"🥇Première place :",
	"🥈Deuxième place :",
	"🥉Troisième place :",
	"  Quatrième place :",
	"  Cinquième place :",
];

const [open, setOpen] = useState(false);

export default function Score({
	time,
	usedClue,
	attemptCount,
	todayCharacter,
	setScoreView,
	fakeCurrentPlayer, // alert input to create onClick "start button"
}: ScoreProps) {
	const timeBis = Number(time) || 0;
	const displayTime = moment.utc(timeBis).format("HH:mm:ss");
	const tentativeBis = Number(attemptCount) || 0;
	const indiceBis = usedClue ? 500 : 0;
	let score = 10500 - timeBis * 0.1 - tentativeBis * 500 - indiceBis;

	if (score < 0) {
		score = 0;
	}

	const sortedRanking = useMemo(
		() =>
			[...otherPlayers, fakeCurrentPlayer].sort((a, b) => b.score - a.score),
		[fakeCurrentPlayer],
	);

	return (
		<section id="popop-score">
			<img
				src={imgCoix}
				alt="Une croix"
				onClick={() => setScoreView(false)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ")
						setScoreView(false);
				}}
			/>
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
							onClick={() => setOpen((prev) => !prev)}
						>
							{open ? "-" : "+"}
						</button>
					</div>
					{open && (
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
					<header>
						<img src={banner} alt="banniere de victoire" />
						<button
							type="button"
							className="daily-ranking-button"
							onClick={() => setOpen((prev) => !prev)}
						>
							{open ? "-" : "+"}
						</button>
					</header>
					{open && (
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
					)}
				</article>
			)}
		</section>
	);
}
