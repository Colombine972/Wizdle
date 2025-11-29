import { useCallback, useEffect, useState } from "react";
import Answers from "../components/Answers";
import Calendar from "../components/Calendar";
import Search from "../components/Search";
import Timer from "../components/Timer";
import "../styles/Search.css";
import Clue from "../components/Clue";
import type { Character } from "../interfaces/interfaces";
import "../styles/Game.css";
import Score from "../components/Score";

function seededRandom(seed: number) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}
function Game() {
	const [answers, setAnswers] = useState<Character[]>([]);
	const [victory, setVictory] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [errorApi, setErrorApi] = useState<string | null>(null);
	const [attemptCount, setAttemptCount] = useState(0);
	const [time, setTime] = useState(0);
	const [usedClue, setUsedClue] = useState(false);
	const [scoreView, setScoreView] = useState(false);
	const [openCalendar, setOpenCalendar] = useState(false);
	const today = new Date().toISOString().split("T")[0];

	const dayFromBegin = useCallback((date: string, beginning = "2025-11-18") => {
		const today = new Date(date);
		const beginningDate = new Date(beginning);
		const difference = today.getTime() - beginningDate.getTime();
		return Math.floor(difference / (1000 * 60 * 60 * 24));
	}, []);

	const seededShuffle = useCallback(<T,>(array: T[], seed: number): T[] => {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(seededRandom(seed + i) * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}, []);

	const getCharacterOfDate = useCallback(
		(date: string, array: Character[], baseSeed = 11092025) => {
			if (array.length === 0) return undefined;
			const totalDays = dayFromBegin(date);
			const cycleLength = array.length;
			const cycleNumber = Math.floor(totalDays / cycleLength);
			const index = totalDays % cycleLength;
			const cycleSeed = baseSeed + cycleNumber;
			const shuffledCharacters = seededShuffle(array, cycleSeed);
			return shuffledCharacters[index];
		},
		[dayFromBegin, seededShuffle],
	);

	const todayCharacter =
		characters.length > 0 ? getCharacterOfDate(today, characters) : undefined;

	const [currentCharacter, setCurrentCharacter] = useState<
		Character | undefined
	>(todayCharacter);

	useEffect(() => {
		fetch("https://test-api-5zsf.onrender.com/harry_potter")
			.then((response) => response.json())
			.then((characters) => {
				setCharacters(characters);
				setCurrentCharacter(getCharacterOfDate(today, characters));
			})
			.catch(() => setErrorApi("Les personnages ont disparu 😲"));
	}, [getCharacterOfDate, today]);

	return (
		<>
			<section className="timer-clue">
				<article>
					<Timer time={time} />
				</article>
				<article>
					<Clue
						attemptCount={attemptCount}
						todayCharacter={currentCharacter}
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
					todayCharacter={currentCharacter}
					setAttemptCount={setAttemptCount}
					setScoreView={setScoreView}
				/>
			)}
			<Answers
				answers={answers}
				characters={characters}
				todayCharacter={currentCharacter}
			/>
			<button
				type="button"
				className="calendar-button"
				onClick={() => setOpenCalendar(true)}
			>
				<img src="/images/calendar.png" alt="Calendrier" />
			</button>
			{openCalendar && (
				<div
					className="modal-overlay"
					onClick={() => setOpenCalendar(false)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ") {
							setOpenCalendar(false);
						}
					}}
				>
					<div
						className="modal-window"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ") {
								setOpenCalendar(false);
							}
						}}
					>
						<Calendar
							openCalendar={openCalendar}
							setOpenCalendar={setOpenCalendar}
							characters={characters}
							getCharacterOfDate={getCharacterOfDate}
							setCurrentCharacter={setCurrentCharacter}
						/>
					</div>
				</div>
			)}
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
