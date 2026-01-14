/**
 * BACK VIEW MUSCLE CHART SVG
 * Clean placeholder shapes for muscle visualization
 * Designer can replace these with proper anatomical paths
 */

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartBack({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Back view muscle chart</title>
			{/* Body outline - simple silhouette */}
			<ellipse cx="100" cy="30" rx="22" ry="28" fill="#444" /> {/* Head */}
			<rect x="92" y="55" width="16" height="20" rx="4" fill="#444" />{" "}
			{/* Neck */}
			<path
				d="M60 75 Q40 85 35 130 L35 220 Q38 240 50 250 L50 380 L70 380 L75 260 L85 260 L85 380 L95 380 L100 180 L105 380 L115 380 L115 260 L125 260 L130 380 L150 380 L150 250 Q162 240 165 220 L165 130 Q160 85 140 75 Z"
				fill="#444"
			/>
			{/* === BACK MUSCLES === */}
			{/* Traps */}
			<path
				d="M70 70 Q100 90 130 70 L125 100 Q100 95 75 100 Z"
				fill={getColor("traps")}
				data-muscle="traps"
			/>
			{/* Rear Delts */}
			<ellipse
				cx="52"
				cy="90"
				rx="10"
				ry="12"
				fill={getColor("rear_delts")}
				data-muscle="rear_delts"
			/>
			<ellipse
				cx="148"
				cy="90"
				rx="10"
				ry="12"
				fill={getColor("rear_delts")}
				data-muscle="rear_delts"
			/>
			{/* Rhomboids */}
			<ellipse
				cx="85"
				cy="105"
				rx="10"
				ry="15"
				fill={getColor("rhomboids")}
				data-muscle="rhomboids"
			/>
			<ellipse
				cx="115"
				cy="105"
				rx="10"
				ry="15"
				fill={getColor("rhomboids")}
				data-muscle="rhomboids"
			/>
			{/* Lats */}
			<path
				d="M62 100 Q55 140 60 170 L75 175 L80 120 Z"
				fill={getColor("lats")}
				data-muscle="lats"
			/>
			<path
				d="M138 100 Q145 140 140 170 L125 175 L120 120 Z"
				fill={getColor("lats")}
				data-muscle="lats"
			/>
			{/* Triceps */}
			<ellipse
				cx="42"
				cy="125"
				rx="8"
				ry="18"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			<ellipse
				cx="158"
				cy="125"
				rx="8"
				ry="18"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			{/* Forearms (back) */}
			<ellipse
				cx="38"
				cy="170"
				rx="6"
				ry="20"
				fill={getColor("forearms_back")}
				data-muscle="forearms_back"
			/>
			<ellipse
				cx="162"
				cy="170"
				rx="6"
				ry="20"
				fill={getColor("forearms_back")}
				data-muscle="forearms_back"
			/>
			{/* Lower Back / Erector Spinae */}
			<rect
				x="88"
				y="130"
				width="24"
				height="45"
				rx="6"
				fill={getColor("lower_back")}
				data-muscle="lower_back"
			/>
			{/* Glutes */}
			<ellipse
				cx="80"
				cy="200"
				rx="18"
				ry="16"
				fill={getColor("glutes")}
				data-muscle="glutes"
			/>
			<ellipse
				cx="120"
				cy="200"
				rx="18"
				ry="16"
				fill={getColor("glutes")}
				data-muscle="glutes"
			/>
			{/* Hamstrings */}
			<ellipse
				cx="75"
				cy="270"
				rx="14"
				ry="45"
				fill={getColor("hamstrings")}
				data-muscle="hamstrings"
			/>
			<ellipse
				cx="125"
				cy="270"
				rx="14"
				ry="45"
				fill={getColor("hamstrings")}
				data-muscle="hamstrings"
			/>
			{/* Calves */}
			<ellipse
				cx="72"
				cy="345"
				rx="10"
				ry="25"
				fill={getColor("calves")}
				data-muscle="calves"
			/>
			<ellipse
				cx="128"
				cy="345"
				rx="10"
				ry="25"
				fill={getColor("calves")}
				data-muscle="calves"
			/>
			{/* Side delts (visible from back) */}
			<ellipse
				cx="45"
				cy="88"
				rx="6"
				ry="10"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>
			<ellipse
				cx="155"
				cy="88"
				rx="6"
				ry="10"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>
		</svg>
	);
}
