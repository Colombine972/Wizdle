import { useState } from "react";
import type { Character } from "../interfaces/interfaces";

interface SearchProps {
	setAttemptCount: React.Dispatch<React.SetStateAction<number>>;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	errorApi: string | null;
	setErrorApi: React.Dispatch<React.SetStateAction<string | null>>;
	answers: Character[];
	setAnswers: React.Dispatch<React.SetStateAction<Character[]>>;
	todayCharacter: Character | undefined;
	characters: Character[];
	setVictory: React.Dispatch<React.SetStateAction<boolean>>;
}
function Search({
	errorApi,
	setErrorApi,
	answers,
	setAnswers,
	todayCharacter,
	characters,
	setVictory,
	setAttemptCount,
	setTime,
}: SearchProps) {
	const [guess, setGuess] = useState("");
	const [listCharacter, setListCharacter] = useState<Character[]>([]);
	const [resultNotFound, setResultNotFound] = useState(false);
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	function start() {
		if (!intervalId) {
			const startTime = Date.now();
			const id = setInterval(() => {
				setTime(Date.now() - startTime);
			}, 10);
			setIntervalId(id);
		}
	}

	function stop() {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	}

	const normalize = (text: string) =>
		text
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")
			.toLowerCase();
	const changeSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setGuess(value);
		setErrorApi(null);
		setResultNotFound(false);

		if (value.trim() === "") {
			setListCharacter([]);
		} else {
			const results = characters
				.filter((item) => normalize(item.nom).startsWith(normalize(value)))
				.filter((item) => !answers.some((character) => character === item))
				.sort((a, b) => a.nom.localeCompare(b.nom));

			setListCharacter(results);

			if (results.length === 0) {
				setResultNotFound(true);
			}
		}
	};

	function victory(character: Character) {
		if (!character || !characters) return;
		if (character.id === todayCharacter?.id) {
			setVictory(true);
			stop();
		}
	}

	const selectCharacter = (character: Character) => {
		setGuess("");
		setListCharacter([]);
		setAttemptCount((prev) => prev + 1);
		start();
		setAnswers((prev) => [character, ...prev]);
		victory(character);
	};

	return (
		<>
			<div className="search-bar-container">
				<input
					className={`search-bar-input ${resultNotFound ? "input-error" : ""}`}
					type="text"
					value={guess}
					onChange={changeSearchBar}
					placeholder="Quel personnage suis-je ?"
				/>
				{errorApi && <p className="error-message">⚠️ {errorApi}</p>}
				<ul
					className={`results ${listCharacter.length > 0 ? "has-results" : ""}`}
				>
					{listCharacter.length > 0 ? (
						listCharacter.map((item: Character) => (
							<li key={item.id} className="character-item">
								<button
									type="button"
									className="character-button"
									onClick={() => selectCharacter(item)}
								>
									<img
										src={item.image}
										alt={item.nom}
										className="character-img"
									/>
									<p>{item.nom}</p>
								</button>
							</li>
						))
					) : guess !== "" ? (
						<li className="error-message">
							Pas très doué(e) en divination, hein ? 🔮
						</li>
					) : null}
				</ul>
			</div>
		</>
	);
}

export default Search;
