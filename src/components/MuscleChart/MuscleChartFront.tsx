/**
 * FRONT VIEW MUSCLE CHART SVG
 * Clean placeholder shapes for muscle visualization
 * Designer can replace these with proper anatomical paths
 */

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartFront({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Front view muscle chart</title>
			{/* Body outline - simple silhouette */}
			<ellipse cx="100" cy="30" rx="22" ry="28" fill="#444" /> {/* Head */}
			<rect x="92" y="55" width="16" height="20" rx="4" fill="#444" />{" "}
			{/* Neck */}
			<path
				d="M60 75 Q40 85 35 130 L35 220 Q38 240 50 250 L50 380 L70 380 L75 260 L85 260 L85 380 L95 380 L100 180 L105 380 L115 380 L115 260 L125 260 L130 380 L150 380 L150 250 Q162 240 165 220 L165 130 Q160 85 140 75 Z"
				fill="#444"
			/>
			{/* === FRONT MUSCLES === */}
			{/* Chest - Pectoralis */}
			<ellipse
				cx="75"
				cy="105"
				rx="22"
				ry="15"
				fill={getColor("chest")}
				data-muscle="chest"
			/>
			<ellipse
				cx="125"
				cy="105"
				rx="22"
				ry="15"
				fill={getColor("chest")}
				data-muscle="chest"
			/>
			{/* Front Delts */}
			<ellipse
				cx="52"
				cy="90"
				rx="10"
				ry="14"
				fill={getColor("front_delts")}
				data-muscle="front_delts"
			/>
			<ellipse
				cx="148"
				cy="90"
				rx="10"
				ry="14"
				fill={getColor("front_delts")}
				data-muscle="front_delts"
			/>
			{/* Biceps */}
			<ellipse
				cx="42"
				cy="130"
				rx="8"
				ry="20"
				fill={getColor("biceps")}
				data-muscle="biceps"
			/>
			<ellipse
				cx="158"
				cy="130"
				rx="8"
				ry="20"
				fill={getColor("biceps")}
				data-muscle="biceps"
			/>
			{/* Forearms (front) */}
			<ellipse
				cx="38"
				cy="175"
				rx="6"
				ry="22"
				fill={getColor("forearms_front")}
				data-muscle="forearms_front"
			/>
			<ellipse
				cx="162"
				cy="175"
				rx="6"
				ry="22"
				fill={getColor("forearms_front")}
				data-muscle="forearms_front"
			/>
			{/* Abs - 6 pack representation */}
			<rect
				x="88"
				y="125"
				width="24"
				height="55"
				rx="6"
				fill={getColor("abs")}
				data-muscle="abs"
			/>
			{/* Obliques */}
			<ellipse
				cx="75"
				cy="145"
				rx="8"
				ry="18"
				fill={getColor("obliques")}
				data-muscle="obliques"
			/>
			<ellipse
				cx="125"
				cy="145"
				rx="8"
				ry="18"
				fill={getColor("obliques")}
				data-muscle="obliques"
			/>
			{/* Hip Flexors */}
			<ellipse
				cx="80"
				cy="195"
				rx="12"
				ry="10"
				fill={getColor("hip_flexors")}
				data-muscle="hip_flexors"
			/>
			<ellipse
				cx="120"
				cy="195"
				rx="12"
				ry="10"
				fill={getColor("hip_flexors")}
				data-muscle="hip_flexors"
			/>
			{/* Quads */}
			<ellipse
				cx="75"
				cy="260"
				rx="16"
				ry="45"
				fill={getColor("quads")}
				data-muscle="quads"
			/>
			<ellipse
				cx="125"
				cy="260"
				rx="16"
				ry="45"
				fill={getColor("quads")}
				data-muscle="quads"
			/>
			{/* Adductors (inner thigh) */}
			<ellipse
				cx="88"
				cy="250"
				rx="6"
				ry="30"
				fill={getColor("adductors")}
				data-muscle="adductors"
			/>
			<ellipse
				cx="112"
				cy="250"
				rx="6"
				ry="30"
				fill={getColor("adductors")}
				data-muscle="adductors"
			/>
			{/* Tibialis (shins) */}
			<ellipse
				cx="70"
				cy="340"
				rx="6"
				ry="25"
				fill={getColor("tibialis")}
				data-muscle="tibialis"
			/>
			<ellipse
				cx="130"
				cy="340"
				rx="6"
				ry="25"
				fill={getColor("tibialis")}
				data-muscle="tibialis"
			/>
			{/* Side delts (visible from front) */}
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
			{/* Triceps (visible from front/side) */}
			<ellipse
				cx="38"
				cy="120"
				rx="5"
				ry="12"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			<ellipse
				cx="162"
				cy="120"
				rx="5"
				ry="12"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
		</svg>
	);
}
