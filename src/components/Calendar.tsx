import { useState } from "react";
import "../styles/Calendar.css";

const days = [
	"Dimanche",
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
];
const months = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
];

function Calendar() {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(today);
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const getTodayDate = () => currentDate.toLocaleDateString();
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const goToPreviousMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};
	const goToNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};
	const allDaysInMonth = [];
	for (let i = 1; i <= daysInMonth; i++) {
		allDaysInMonth.push(i);
	}

	return (
		<>
			<button
				type="button"
				className="calendar-button"
				onClick={() => alert(`Nous sommes le ${getTodayDate()}`)}
			>
				<img src="/images/calendar.png" alt="Calendar" />
			</button>
			<button type="button" className="arrow" onClick={goToPreviousMonth}>
				<img
					src="/images/fleche-gauche.png"
					alt="Previous Month"
					className="arrow"
				/>
			</button>
			<h2 className="calendar-date">{months[month]}</h2>
			<button type="button" className="arrow" onClick={goToNextMonth}>
				<img
					src="/images/fleche-droite.png"
					alt="Next Month"
					className="arrow"
				/>
			</button>
			<h2 className="calendar-date">{year}</h2>
			<section className="calendar-grid">
				<div>
					{days.map((day) => (
						<p key={day}>{day}</p>
					))}
				</div>
				<div>
					{allDaysInMonth.map((day) => (
						<p key={day}>{day}</p>
					))}
				</div>
			</section>
			<div className="calendar-date">
				<h2>Calendrier</h2>
				<p>Date actuelle : {getTodayDate()}</p>
			</div>
		</>
	);
}
export default Calendar;
