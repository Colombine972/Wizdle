import { useState } from "react";
import "../styles/Calendar.css";

const days = [
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
	"Dimanche",
];

function Calendar() {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(today);
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const getTodayDate = () => currentDate.toLocaleDateString();
	const firstDay = new Date(year, month, 1).getDay();
	const goToPreviousMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};
	const goToNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};
	return (
		<>
			<button type="button" className="arrow" onClick={goToPreviousMonth}>
				<img
					src="/images/fleche-gauche.png"
					alt="Previous Month"
					className="arrow"
				/>
			</button>
			<button type="button" className="arrow" onClick={goToNextMonth}>
				<img
					src="/images/fleche-droite.png"
					alt="Next Month"
					className="arrow"
				/>
			</button>
			<button
				type="button"
				className="calendar-button"
				onClick={() => alert(`Nous sommes le ${getTodayDate()}`)}
			>
				<img src="/images/calendar.png" alt="Calendar" />
			</button>

			<div>
				<h2>Calendrier</h2>
				<p>Date actuelle : {getTodayDate()}</p>
			</div>
			<div>
				{days.map((day) => (
					<div key={day}>{day}</div>
				))}
			</div>
		</>
	);
}
export default Calendar;
