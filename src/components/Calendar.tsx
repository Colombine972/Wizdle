import { useState } from "react";
import "../styles/Calendar.css";

interface CalendarProps {
	openCalendar: boolean;
	setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

const days = [
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
	"Dimanche",
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

function Calendar({ openCalendar, setOpenCalendar }: CalendarProps) {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(today);
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const getTodayDate = () => currentDate.toLocaleDateString();
	const firstDay = new Date(year, month, 1).getDay();
	const adjustedFirstDayInFrance = (firstDay + 6) % 7;
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
	const emptyBox = [];
	for (let i = 1; i <= adjustedFirstDayInFrance; i++) {
		emptyBox.push(i);
	}

	return (
		<section className="popup-calendar">
			<section className="calendar-header">
				<section className="header-arrow">
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
				</section>
				<section className="header-date">
					<h2 className="calendar-date">{months[month]}</h2>
					<h2 className="calendar-date">{year}</h2>
				</section>
			</section>
			<section className="calendar-grid">
				{days.map((day) => (
					<div className="day-row" key={`weekday-${day}`}>
						{day}
					</div>
				))}

				{emptyBox.map((day) => (
					<div className="box-empty" key={`empty-${day}`} />
				))}
				{allDaysInMonth.map((day) => (
					<div className="box" key={`day-${day}`}>
						{day}
					</div>
				))}
			</section>
			<button
				type="button"
				onClick={() => setOpenCalendar(false)}
				className="button-close"
			>
				<img src="/images/croix.svg" alt="fermeture" />
			</button>
		</section>
	);
}
export default Calendar;
