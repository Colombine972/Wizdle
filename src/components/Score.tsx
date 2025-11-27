import moment from "moment";
import "../styles/score.css";
import imgCastle from "../images/carte-chateau.png";
import imgCroix from "../images/croix.svg";
import imgSablier from "../images/sablier.svg";
import type { Character } from "../interfaces/interfaces";

type ScoreProps = {
	time: number;
	usedClue: boolean;
	attemptCount: number;
	todayCharacter: Character | undefined;
	setScoreView: React.Dispatch<React.SetStateAction<boolean>>;
};

function Score({
	time,
	usedClue,
	attemptCount,
	todayCharacter,
	setScoreView,
}: ScoreProps) {
	const timeBis = Number(time) || 0;
	const displayTime = moment.utc(timeBis).format("HH:mm:ss");
	const tentativeBis = Number(attemptCount) || 0;
	const indiceBis = usedClue ? 500 : 0;
	let score = 10500 - timeBis * 0.1 - tentativeBis * 500 - indiceBis;

	if (score < 0) {
		score = 0;
	}

	const tableHouses = ["Gryffondor", "Poufsouffle", "Serdaigle", "Serpentard"];
	const house = tableHouses[Math.floor(Math.random() * tableHouses.length)];

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
					<article>
						<p>Carte : {todayCharacter?.nom}</p>
						<button type="button" aria-label="Une croix">
							<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
								<title>Icône croix</title>
								<line
									x1="50"
									y1="20"
									x2="50"
									y2="80"
									stroke="white"
									strokeWidth="10"
									strokeLinecap="round"
								/>
								<line
									x1="20"
									y1="50"
									x2="80"
									y2="50"
									stroke="white"
									strokeWidth="10"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</article>
				</div>
			</div>
		</section>
	);
}
export default Score;
