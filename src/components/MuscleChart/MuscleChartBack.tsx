/**
 * BACK VIEW MUSCLE CHART SVG
 * Clean stylized body with muscle groups
 */

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartBack({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Back view muscle chart</title>

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

			{/* Traps */}
			<path
				d="M76 58 Q100 80 124 58 L132 92 Q100 104 68 92 Z"
				fill={getColor("traps")}
				data-muscle="traps"
			/>

			{/* Rear Delts */}
			<ellipse
				cx="56"
				cy="88"
				rx="11"
				ry="11"
				fill={getColor("rear_delts")}
				data-muscle="rear_delts"
			/>
			<ellipse
				cx="144"
				cy="88"
				rx="11"
				ry="11"
				fill={getColor("rear_delts")}
				data-muscle="rear_delts"
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

			{/* Rhomboids */}
			<ellipse
				cx="86"
				cy="102"
				rx="9"
				ry="13"
				fill={getColor("rhomboids")}
				data-muscle="rhomboids"
			/>
			<ellipse
				cx="114"
				cy="102"
				rx="9"
				ry="13"
				fill={getColor("rhomboids")}
				data-muscle="rhomboids"
			/>

			{/* Lats */}
			<path
				d="M68 100 Q58 140 64 172 L80 172 L82 110 Z"
				fill={getColor("lats")}
				data-muscle="lats"
			/>
			<path
				d="M132 100 Q142 140 136 172 L120 172 L118 110 Z"
				fill={getColor("lats")}
				data-muscle="lats"
			/>

			{/* Triceps */}
			<ellipse
				cx="38"
				cy="122"
				rx="8"
				ry="20"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			<ellipse
				cx="162"
				cy="122"
				rx="8"
				ry="20"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>

			{/* Forearms (back) */}
			<ellipse
				cx="32"
				cy="162"
				rx="6"
				ry="18"
				fill={getColor("forearms_back")}
				data-muscle="forearms_back"
			/>
			<ellipse
				cx="168"
				cy="162"
				rx="6"
				ry="18"
				fill={getColor("forearms_back")}
				data-muscle="forearms_back"
			/>

			{/* Lower Back */}
			<rect
				x="86"
				y="128"
				width="28"
				height="42"
				rx="5"
				fill={getColor("lower_back")}
				data-muscle="lower_back"
			/>

			{/* Glutes */}
			<ellipse
				cx="82"
				cy="200"
				rx="16"
				ry="15"
				fill={getColor("glutes")}
				data-muscle="glutes"
			/>
			<ellipse
				cx="118"
				cy="200"
				rx="16"
				ry="15"
				fill={getColor("glutes")}
				data-muscle="glutes"
			/>

			{/* Hamstrings */}
			<ellipse
				cx="80"
				cy="278"
				rx="14"
				ry="55"
				fill={getColor("hamstrings")}
				data-muscle="hamstrings"
			/>
			<ellipse
				cx="120"
				cy="278"
				rx="14"
				ry="55"
				fill={getColor("hamstrings")}
				data-muscle="hamstrings"
			/>

			{/* Calves */}
			<ellipse
				cx="78"
				cy="355"
				rx="9"
				ry="20"
				fill={getColor("calves")}
				data-muscle="calves"
			/>
			<ellipse
				cx="122"
				cy="355"
				rx="9"
				ry="20"
				fill={getColor("calves")}
				data-muscle="calves"
			/>
		</svg>
	);
}
