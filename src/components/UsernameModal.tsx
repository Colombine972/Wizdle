import { useState } from "react";
import { useUsername } from "../contexts/UsernameContext";
import "../styles/UsenameModal.css";
import enveloppeScellee from "../assets/images/enveloppe-scellee.png";

function UsernameModal() {
	const { username, setUsername } = useUsername();
	const [value, setValue] = useState("");

	if (username) return null;

	const validatedName = () => {
		const userInput = value.trim();
		userInput && setUsername(userInput);
	};

	return (
		<div className="username-modal-container">
			<dialog open>
				<h2>Bienvenu jeune sorcier(e)!</h2>
				<input
					value={value}
					placeholder="Inscris ton Nom dans le Grimoire:"
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && validatedName()}
				/>
				<button type="button" onClick={validatedName}>
					<img src={enveloppeScellee} alt="enveloppe scellée" />
					Scelles ton nom
				</button>
			</dialog>
		</div>
	);
}
export default UsernameModal;
