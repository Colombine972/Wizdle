import { useState } from "react";
import { useNavigate } from "react-router";
import baguetteMagique from "../assets/images/baguette-magique.png";
import { useUsername } from "../contexts/UsernameContext";
import "../styles/StartGameButton.css";

function StartGameButton() {
	const { setUsername } = useUsername();
	const [userInput, setUserInput] = useState("");
	const [userInputModal, setUserInputModal] = useState(false);
	const navigate = useNavigate();
	const displayUserInputModal = () => {
		setUserInputModal(true);
	};

	const gameStart = () => {
		if (!userInput.trim()) return;
		setUsername(userInput.trim());
		setUserInputModal(false);
		navigate("/game");
	};

	return (
		<>
			<button
				className="game-button"
				type="button"
				onClick={displayUserInputModal}
			>
				<img src={baguetteMagique} alt="baguette magique" />À toi de jouer,
				sorcier(e)!
			</button>

			{userInputModal && (
				<div className="user-input-modal-container">
					<div className="user-input-modal">
						<p>Inscrire ton Nom dans le Grimoire:</p>
						<input
							type="text"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
						/>
						<button type="button" onClick={gameStart}>
							Sceller
						</button>
					</div>
				</div>
			)}
		</>
	);
}
export default StartGameButton;
