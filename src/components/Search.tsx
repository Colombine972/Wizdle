import { useEffect, useState } from "react";
import type { Character } from "../interfaces/interfaces";

function Search() {
	const [guess, setGuess] = useState("");
	const [dataApi, setDataApi] = useState<Character[]>([]);
	const [listCharacter, setListCharacter] = useState<Character[]>([]);
	const [errorApi, setErrorApi] = useState<string | null>(null);
	const [resultNotFound, setResultNotFound] = useState(false);
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null,
	);

	useEffect(() => {
		fetch("https://test-api-5zsf.onrender.com/harry_potter")
			.then((response) => response.json())
			.then((characters) => {
				setDataApi(characters);
			})
			.catch(() => setErrorApi("Les personnages ont disparu 😲"));
	}, []);

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
			const results = dataApi
				.filter((item) => normalize(item.nom).startsWith(normalize(value)))
				.sort((a, b) => a.nom.localeCompare(b.nom));

			setListCharacter(results);

			if (results.length === 0) {
				setResultNotFound(true);
			}
		}
	};

	const selectCharacter = (character: Character) => {
		setSelectedCharacter(character);
		setGuess("");
		setListCharacter([]);
	};

	return (
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

			{selectedCharacter && (
				<div className="character-details">
					<p>{selectedCharacter.nom}</p>
					<p>Espece :{selectedCharacter.espece || "Inconnue"}</p>
					<p>Genre : {selectedCharacter.genre || "Inconnue"}</p>
					<p>Ascendance : {selectedCharacter.ascendance || "Inconnue"}</p>
					<p>Maison : {selectedCharacter.maison || "Inconnue"}</p>
					<p>En vie ? : {selectedCharacter.vivant || "Inconnue"}</p>
					<p>Cheveux : {selectedCharacter.couleur_cheveux || "Inconnue"}</p>
				</div>
			)}
		</div>
	);
}

export default Search;
