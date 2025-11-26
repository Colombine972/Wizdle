import { useMemo, useState } from "react";

type Player = {
	id: string;
	name: string;
	score: number;
};

type DailyRankingProps = {
	otherPlayers: Player[];
	fakeCurrentPlayer: Player;
};

const rankLabels = [
	"🥇Première place :",
	"🥈Deuxième place :",
	"🥉Troisième place :",
	"  Quatrième place :",
	"  Cinquième place :",
];

export default function DailyRanking({
	otherPlayers,
	fakeCurrentPlayer,
}: DailyRankingProps) {
	const [open, setOpen] = useState(false);
	const sortedRanking = useMemo(
		() =>
			[...otherPlayers, fakeCurrentPlayer].sort((a, b) => b.score - a.score),
		[otherPlayers, fakeCurrentPlayer],
	);

	return (
		<section id="daily-ranking-container">
			<header>
				<img src="../assets/images/banniere.png" alt="banniere de victoire" />
				<button
					type="button"
					className="daly-ranking-button"
					onClick={() => setOpen(!open)}
				>
					{open ? "-" : "+"}
				</button>
			</header>
			{open && (
				<table>
					<caption>
						<h2>CLASSEMENT</h2>
					</caption>
					<tbody>
						{rankLabels.map((label, index) => {
							const player = sortedRanking[index];
							if (!player) return null;
							return (
								<tr key={label}>
									<th>{label}</th>
									<td>
										{player.name}, {player.score} points
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</section>
	);
}
