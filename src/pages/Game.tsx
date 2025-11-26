import { useEffect, useState } from "react";
import Answers from "../components/Answers";
import Calendar from "../components/Calendar";
import Search from "../components/Search";
import Timer from "../components/Timer";
import "../styles/Search.css";
import Clue from "../components/Clue";
import type { Character } from "../interfaces/interfaces";
import "../styles/Game.css";
import Score from "../components/Score";

function Game() {
	const [answers, setAnswers] = useState<Character[]>([]);
	const [victory, setVictory] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [errorApi, setErrorApi] = useState<string | null>(null);
	const [attemptCount, setAttemptCount] = useState(0);
	const [time, setTime] = useState(0);
	const [usedClue, setUsedClue] = useState(false);
	const [scoreView, setScoreView] = useState(false);

	const today = new Date().toISOString().split("T")[0];

	function dayFromBegin(date: string, beginning = "2025-11-18") {
		const today = new Date(date);
		const beginningDate = new Date(beginning);
		const difference = today.getTime() - beginningDate.getTime();
		return Math.floor(difference / (1000 * 60 * 60 * 24));
	}

	function seededRandom(seed: number) {
		const x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	}

	function seededShuffle<T>(array: T[], seed: number): T[] {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(seededRandom(seed + i) * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	function getCharacterOfDate(
		date: string,
		array: Character[],
		baseSeed = 11092025,
	) {
		if (array.length === 0) return undefined;

		const totalDays = dayFromBegin(date);
		const cycleLength = array.length;
		const cycleNumber = Math.floor(totalDays / cycleLength);
		const index = totalDays % cycleLength;
		const cycleSeed = baseSeed + cycleNumber;
		const shuffledCharacters = seededShuffle(array, cycleSeed);
		return shuffledCharacters[index];
	}

	const todayCharacter =
		characters.length > 0 ? getCharacterOfDate(today, characters) : undefined;

	useEffect(() => {
		fetch("https://test-api-5zsf.onrender.com/harry_potter")
			.then((response) => response.json())
			.then((characters) => {
				setCharacters(characters);
			})
			.catch(() => setErrorApi("Les personnages ont disparu 😲"));
	}, []);

	return (
		<>
			<section className="timer-clue">
				<article>
					<Timer time={time} />
				</article>
				<article>
					<Clue
						attemptCount={attemptCount}
						todayCharacter={todayCharacter}
						setUsedClue={setUsedClue}
					/>
				</article>
			</section>
			{!victory && (
				<Search
					setTime={setTime}
					setAnswers={setAnswers}
					errorApi={errorApi}
					characters={characters}
					setErrorApi={setErrorApi}
					answers={answers}
					setVictory={setVictory}
					todayCharacter={todayCharacter}
					setAttemptCount={setAttemptCount}
					setScoreView={setScoreView}
				/>
			)}
			<Answers
				answers={answers}
				characters={characters}
				todayCharacter={todayCharacter}
			/>
			<Calendar />

			{victory && scoreView && (
				<div className="overlay">
					<Score
						time={time}
						usedClue={usedClue}
						attemptCount={attemptCount}
						todayCharacter={todayCharacter}
						setScoreView={setScoreView}
					/>
				</div>
			)}
		</>
	);
}
export default Game;
