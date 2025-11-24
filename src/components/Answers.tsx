import "../styles/answers.css";
import type { Character } from "../interfaces/interfaces";

interface AnswersProps {
	answers: Character[];
	todayCharacter: Character | undefined;
	characters: Character[];
}

function Answers({ answers, characters, todayCharacter }: AnswersProps) {
	if (characters.length === 0) {
		return <p>Chargement des données...</p>;
	}

	return (
		<>
			<section className="table-container">
				<table id="table-game">
					<thead>
						<tr>
							<th>Nom</th>
							<th>Espèce</th>
							<th>Genre</th>
							<th>Ascendance</th>
							<th>Maison</th>
							<th>En vie?</th>
							<th>Cheveux</th>
						</tr>
					</thead>
					<tbody>
						{answers.length > 0 &&
							answers.map((character: Character) => (
								<tr key={character.id}>
									<td>
										<div className="cell-principal">
											<span>{character?.nom}</span>
											{todayCharacter?.nom === character?.nom ? (
												<img
													src="./src/assets/images/coche-vert.png"
													alt="validation"
												/>
											) : (
												<img
													src="./src/assets/images/coche-rouge.png"
													alt="refus"
												/>
											)}
										</div>
									</td>
									<td
										className={
											todayCharacter?.espece === character?.espece
												? "box-true"
												: "box-false"
										}
									>
										{character?.espece}
									</td>
									<td
										className={
											todayCharacter?.genre === character?.genre
												? "box-true"
												: "box-false"
										}
									>
										{character?.genre === "" ? "Inconnu" : character.genre}
									</td>
									<td
										className={
											todayCharacter?.ascendance === character?.ascendance
												? "box-true"
												: "box-false"
										}
									>
										{character?.ascendance === ""
											? "Inconnu"
											: character.ascendance}
									</td>
									<td
										className={
											todayCharacter?.maison === character?.maison
												? "box-true"
												: "box-false"
										}
									>
										{character?.maison === "" ? "Inconnu" : character.maison}
									</td>
									<td
										className={
											todayCharacter?.vivant === character?.vivant
												? "box-true"
												: "box-false"
										}
									>
										{character?.vivant ? "oui" : "non"}
									</td>
									<td
										className={
											todayCharacter?.couleur_cheveux ===
											character?.couleur_cheveux
												? "box-true"
												: "box-false"
										}
									>
										{character?.couleur_cheveux === ""
											? "Inconnu"
											: character.couleur_cheveux}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</section>
		</>
	);
}
export default Answers;
