/**
 * BACK VIEW MUSCLE CHART SVG
 *
 * Designer Instructions:
 * - ViewBox is 200x400 (width x height)
 * - Replace the placeholder <rect> elements with proper <path> elements
 * - Keep the same `id` attributes - they're used for coloring
 * - Each muscle region should be a separate path/group
 * - Left and right sides can be separate paths with the same fill
 * - Body outline should be a neutral color (use CSS variable)
 *
 * Coordinate guide (approximate positions for a standing figure):
 * - Head: y=0-40
 * - Neck: y=40-55
 * - Traps: y=50-85
 * - Shoulders: y=55-80
 * - Upper back (lats, rhomboids): y=85-160
 * - Lower back: y=140-190
 * - Arms: x=10-45 (left), x=155-190 (right), y=70-200
 * - Glutes: y=185-230
 * - Legs: y=220-380
 * - Feet: y=380-400
 */

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartBack({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Back view muscle chart</title>
			{/* ========================================
			    BODY OUTLINE / SILHOUETTE
			    Replace with proper body outline path
			    ======================================== */}
			<rect
				x="30"
				y="0"
				width="140"
				height="400"
				fill="var(--ion-color-light-shade)"
				opacity="0.3"
				rx="20"
			/>

			{/* ========================================
			    NECK (Back view)
			    Position: Center top, back of neck
			    Designer: Replace rect with neck shape
			    ======================================== */}
			<rect
				id="neck-back"
				x="85"
				y="42"
				width="30"
				height="18"
				rx="4"
				fill={getColor("neck")}
				data-muscle="neck"
			/>

			{/* ========================================
			    TRAPS (Trapezius)
			    Position: Upper back, from neck to shoulders
			    Designer: Replace with trapezoid/diamond shape
			    ======================================== */}
			<rect
				id="traps-upper"
				x="60"
				y="55"
				width="80"
				height="30"
				rx="8"
				fill={getColor("traps")}
				data-muscle="traps"
			/>

			{/* ========================================
			    REAR DELTS (Left and Right)
			    Position: Back of shoulders
			    Designer: Replace with rear delt shapes
			    ======================================== */}
			<rect
				id="rear-delt-left"
				x="42"
				y="60"
				width="20"
				height="28"
				rx="6"
				fill={getColor("rear_delts")}
				data-muscle="rear_delts"
			/>
			<rect
				id="rear-delt-right"
				x="138"
				y="60"
				width="20"
				height="28"
				rx="6"
				fill={getColor("rear_delts")}
				data-muscle="rear_delts"
			/>

			{/* ========================================
			    SIDE DELTS (Left and Right) - Back view
			    Position: Outer edge of shoulders
			    Designer: Replace with outer shoulder curve
			    ======================================== */}
			<rect
				id="side-delt-left-back"
				x="32"
				y="62"
				width="12"
				height="26"
				rx="4"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>
			<rect
				id="side-delt-right-back"
				x="156"
				y="62"
				width="12"
				height="26"
				rx="4"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>

			{/* ========================================
			    RHOMBOIDS (Left and Right)
			    Position: Upper-mid back, between spine and shoulder blades
			    Designer: Replace with rhomboid shapes
			    ======================================== */}
			<rect
				id="rhomboid-left"
				x="68"
				y="88"
				width="25"
				height="35"
				rx="4"
				fill={getColor("rhomboids")}
				data-muscle="rhomboids"
			/>
			<rect
				id="rhomboid-right"
				x="107"
				y="88"
				width="25"
				height="35"
				rx="4"
				fill={getColor("rhomboids")}
				data-muscle="rhomboids"
			/>

			{/* ========================================
			    LATS (Latissimus Dorsi - Left and Right)
			    Position: Mid-back, wide V-shape
			    Designer: Replace with lat spread shapes
			    ======================================== */}
			<rect
				id="lat-left"
				x="52"
				y="95"
				width="20"
				height="65"
				rx="6"
				fill={getColor("lats")}
				data-muscle="lats"
			/>
			<rect
				id="lat-right"
				x="128"
				y="95"
				width="20"
				height="65"
				rx="6"
				fill={getColor("lats")}
				data-muscle="lats"
			/>

			{/* ========================================
			    TRICEPS (Left and Right) - Back view
			    Position: Back of upper arm
			    Designer: Replace with tricep horseshoe shapes
			    ======================================== */}
			<rect
				id="tricep-left"
				x="30"
				y="92"
				width="20"
				height="48"
				rx="6"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			<rect
				id="tricep-right"
				x="150"
				y="92"
				width="20"
				height="48"
				rx="6"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>

			{/* ========================================
			    FOREARMS (Left and Right) - Back view
			    Position: Lower arm, back/outer side
			    Designer: Replace with forearm extensor shapes
			    ======================================== */}
			<rect
				id="forearm-left-back"
				x="22"
				y="145"
				width="22"
				height="50"
				rx="6"
				fill={getColor("forearms_back")}
				data-muscle="forearms_back"
			/>
			<rect
				id="forearm-right-back"
				x="156"
				y="145"
				width="22"
				height="50"
				rx="6"
				fill={getColor("forearms_back")}
				data-muscle="forearms_back"
			/>

			{/* ========================================
			    LOWER BACK (Erector Spinae)
			    Position: Lower spine area
			    Designer: Replace with lower back muscle shape
			    ======================================== */}
			<rect
				id="lower-back"
				x="75"
				y="145"
				width="50"
				height="45"
				rx="6"
				fill={getColor("lower_back")}
				data-muscle="lower_back"
			/>

			{/* ========================================
			    GLUTES (Left and Right)
			    Position: Buttocks
			    Designer: Replace with glute shapes
			    ======================================== */}
			<rect
				id="glute-left"
				x="60"
				y="192"
				width="35"
				height="40"
				rx="10"
				fill={getColor("glutes")}
				data-muscle="glutes"
			/>
			<rect
				id="glute-right"
				x="105"
				y="192"
				width="35"
				height="40"
				rx="10"
				fill={getColor("glutes")}
				data-muscle="glutes"
			/>

			{/* ========================================
			    HAMSTRINGS (Left and Right)
			    Position: Back of thigh
			    Designer: Replace with hamstring muscle group shapes
			    ======================================== */}
			<rect
				id="hamstring-left"
				x="58"
				y="235"
				width="30"
				height="75"
				rx="8"
				fill={getColor("hamstrings")}
				data-muscle="hamstrings"
			/>
			<rect
				id="hamstring-right"
				x="112"
				y="235"
				width="30"
				height="75"
				rx="8"
				fill={getColor("hamstrings")}
				data-muscle="hamstrings"
			/>

			{/* ========================================
			    CALVES (Left and Right)
			    Position: Back of lower leg
			    Designer: Replace with calf muscle shapes (gastrocnemius)
			    ======================================== */}
			<rect
				id="calf-left"
				x="55"
				y="315"
				width="28"
				height="55"
				rx="8"
				fill={getColor("calves")}
				data-muscle="calves"
			/>
			<rect
				id="calf-right"
				x="117"
				y="315"
				width="28"
				height="55"
				rx="8"
				fill={getColor("calves")}
				data-muscle="calves"
			/>
		</svg>
	);
}
