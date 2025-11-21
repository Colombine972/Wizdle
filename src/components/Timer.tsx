import "../styles/Timer.css";

interface TimerProps {
	time: number;
}

function Timer({ time }: TimerProps) {
	function formatTime(elapsedTime: number) {
		const minutes = String(
			Math.floor((elapsedTime / (1000 * 60)) % 60),
		).padStart(2, "0");

		const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(
			2,
			"0",
		);

		const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(
			2,
			"0",
		);

		return `${minutes}:${seconds}:${milliseconds}`;
	}

	return (
		<>
			<div className="chrono-container">
				<img
					src="./src/assets/images/retourneur-de-temps.png"
					alt="sablier retourneur de temps"
				/>
				<p>{formatTime(time)}</p>
			</div>
		</>
	);
}

export default Timer;
