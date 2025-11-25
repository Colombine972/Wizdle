import { useEffect, useState } from "react";
import Answers from "../components/Answers";
import Search from "../components/Search";
import Timer from "../components/Timer";
import "../styles/Search.css";
import Clue from "../components/Clue";
import type { Character } from "../interfaces/interfaces";
import "../styles/Game.css";
import "../styles/Training.css";
import { useClue } from "../utils/ClueContext";

function Training() {
	const [answers, setAnswers] = useState<Character[]>([]);
	const [victory, setVictory] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [errorApi, setErrorApi] = useState<string | null>(null);
	const [attemptCount, setAttemptCount] = useState(0);
	const [time, setTime] = useState(0);
	const [usedClue, setUsedClue] = useState(false);
	const [randomCharacter, setRandomCharacter] = useState<
		Character | undefined
	>();

	const { setClueVisible } = useClue();

	useEffect(() => {
		fetch("https://test-api-5zsf.onrender.com/harry_potter")
			.then((response) => response.json())
			.then((characters) => {
				setCharacters(characters);
			})
			.catch(() => setErrorApi("Les personnages ont disparu 😲"));
	}, []);

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * characters.length);
		setRandomCharacter(characters[randomNumber]);
	}, [characters]);

	function newGame() {
		setTime(0);
		setUsedClue(false);
		setAttemptCount(0);
		setAnswers([]);
		setVictory(false);
		setClueVisible(false);
		const randomNumber = Math.floor(Math.random() * characters.length);
		setRandomCharacter(characters[randomNumber]);
	}

	return (
		<>
			<section className="timer-clue">
				<article>
					<Timer time={time} />
				</article>
				<article>
					<Clue
						attemptCount={attemptCount}
						todayCharacter={randomCharacter}
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
					todayCharacter={randomCharacter}
					setAttemptCount={setAttemptCount}
				/>
			)}
			<Answers
				answers={answers}
				characters={characters}
				todayCharacter={randomCharacter}
			/>

			{victory && (
				<h1>{usedClue ? "Victoire avec indice !!!!" : "Victoire !!!!!!!!"}</h1>
			)}

			<button type="button" onClick={newGame} className="randomizer">
				{" "}
				Nouvelle partie ?{" "}
			</button>
		</>
	);
}

export default Training;
