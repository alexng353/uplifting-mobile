/**
 * FRONT VIEW MUSCLE CHART SVG
 * Clean stylized body with muscle groups
 */

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartFront({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Front view muscle chart</title>

			{/* Body silhouette */}
			<path
				d={`
					M100 5
					C118 5 122 18 122 28
					C122 40 114 48 108 52
					L108 58
					C130 62 148 75 155 98
					L165 102 L176 148 L180 195
					L166 200 L152 142 L145 100
					L145 168 L138 198
					L130 360 L126 372 L118 374
					L108 218 L100 222
					L92 218 L82 374 L74 372 L70 360
					L62 198 L55 168
					L55 100 L48 142 L34 200
					L20 195 L24 148 L35 102
					L45 98 C52 75 70 62 92 58
					L92 52
					C86 48 78 40 78 28
					C78 18 82 5 100 5
					Z
				`}
				fill="#3a3a3a"
			/>

			{/* Feet */}
			<ellipse cx="78" cy="380" rx="12" ry="6" fill="#3a3a3a" />
			<ellipse cx="122" cy="380" rx="12" ry="6" fill="#3a3a3a" />

			{/* === MUSCLES === */}

			{/* Chest */}
			<ellipse
				cx="78"
				cy="102"
				rx="20"
				ry="15"
				fill={getColor("chest")}
				data-muscle="chest"
			/>
			<ellipse
				cx="122"
				cy="102"
				rx="20"
				ry="15"
				fill={getColor("chest")}
				data-muscle="chest"
			/>

			{/* Front Delts */}
			<ellipse
				cx="56"
				cy="85"
				rx="10"
				ry="13"
				fill={getColor("front_delts")}
				data-muscle="front_delts"
			/>
			<ellipse
				cx="144"
				cy="85"
				rx="10"
				ry="13"
				fill={getColor("front_delts")}
				data-muscle="front_delts"
			/>

			{/* Side Delts */}
			<ellipse
				cx="46"
				cy="90"
				rx="6"
				ry="11"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>
			<ellipse
				cx="154"
				cy="90"
				rx="6"
				ry="11"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>

			{/* Biceps */}
			<ellipse
				cx="40"
				cy="122"
				rx="8"
				ry="18"
				fill={getColor("biceps")}
				data-muscle="biceps"
			/>
			<ellipse
				cx="160"
				cy="122"
				rx="8"
				ry="18"
				fill={getColor("biceps")}
				data-muscle="biceps"
			/>

			{/* Triceps (visible from front) */}
			<ellipse
				cx="34"
				cy="118"
				rx="4"
				ry="13"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			<ellipse
				cx="166"
				cy="118"
				rx="4"
				ry="13"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>

			{/* Forearms */}
			<ellipse
				cx="32"
				cy="162"
				rx="6"
				ry="18"
				fill={getColor("forearms_front")}
				data-muscle="forearms_front"
			/>
			<ellipse
				cx="168"
				cy="162"
				rx="6"
				ry="18"
				fill={getColor("forearms_front")}
				data-muscle="forearms_front"
			/>

			{/* Abs */}
			<rect
				x="86"
				y="122"
				width="28"
				height="52"
				rx="5"
				fill={getColor("abs")}
				data-muscle="abs"
			/>

			{/* Obliques */}
			<ellipse
				cx="75"
				cy="142"
				rx="9"
				ry="22"
				fill={getColor("obliques")}
				data-muscle="obliques"
			/>
			<ellipse
				cx="125"
				cy="142"
				rx="9"
				ry="22"
				fill={getColor("obliques")}
				data-muscle="obliques"
			/>

			{/* Hip Flexors */}
			<ellipse
				cx="82"
				cy="195"
				rx="11"
				ry="9"
				fill={getColor("hip_flexors")}
				data-muscle="hip_flexors"
			/>
			<ellipse
				cx="118"
				cy="195"
				rx="11"
				ry="9"
				fill={getColor("hip_flexors")}
				data-muscle="hip_flexors"
			/>

			{/* Quads */}
			<ellipse
				cx="80"
				cy="275"
				rx="16"
				ry="58"
				fill={getColor("quads")}
				data-muscle="quads"
			/>
			<ellipse
				cx="120"
				cy="275"
				rx="16"
				ry="58"
				fill={getColor("quads")}
				data-muscle="quads"
			/>

			{/* Adductors */}
			<ellipse
				cx="92"
				cy="252"
				rx="6"
				ry="26"
				fill={getColor("adductors")}
				data-muscle="adductors"
			/>
			<ellipse
				cx="108"
				cy="252"
				rx="6"
				ry="26"
				fill={getColor("adductors")}
				data-muscle="adductors"
			/>

			{/* Tibialis (shins) */}
			<ellipse
				cx="78"
				cy="352"
				rx="5"
				ry="18"
				fill={getColor("tibialis")}
				data-muscle="tibialis"
			/>
			<ellipse
				cx="122"
				cy="352"
				rx="5"
				ry="18"
				fill={getColor("tibialis")}
				data-muscle="tibialis"
			/>
		</svg>
	);
}
