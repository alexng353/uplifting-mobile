/**
 * FRONT VIEW MUSCLE CHART SVG
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
 * - Shoulders: y=55-80
 * - Chest: y=70-120
 * - Arms: x=10-45 (left), x=155-190 (right), y=70-200
 * - Abs: y=120-200, x=75-125
 * - Legs: y=200-380
 * - Feet: y=380-400
 */

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartFront({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Front view muscle chart</title>
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
			    NECK
			    Position: Center top, below head
			    Designer: Replace rect with neck shape
			    ======================================== */}
			<rect
				id="neck-front"
				x="85"
				y="45"
				width="30"
				height="20"
				rx="4"
				fill={getColor("neck")}
				data-muscle="neck"
			/>

			{/* ========================================
			    FRONT DELTS (Left and Right)
			    Position: Top of shoulders, front-facing
			    Designer: Replace with rounded shoulder caps
			    ======================================== */}
			<rect
				id="front-delt-left"
				x="45"
				y="60"
				width="25"
				height="30"
				rx="6"
				fill={getColor("front_delts")}
				data-muscle="front_delts"
			/>
			<rect
				id="front-delt-right"
				x="130"
				y="60"
				width="25"
				height="30"
				rx="6"
				fill={getColor("front_delts")}
				data-muscle="front_delts"
			/>

			{/* ========================================
			    SIDE DELTS (Left and Right)
			    Position: Outer edge of shoulders
			    Designer: Replace with outer shoulder curve
			    ======================================== */}
			<rect
				id="side-delt-left"
				x="35"
				y="62"
				width="12"
				height="28"
				rx="4"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>
			<rect
				id="side-delt-right"
				x="153"
				y="62"
				width="12"
				height="28"
				rx="4"
				fill={getColor("side_delts")}
				data-muscle="side_delts"
			/>

			{/* ========================================
			    CHEST (Left and Right Pec)
			    Position: Upper torso, below shoulders
			    Designer: Replace with pec muscle shapes
			    ======================================== */}
			<rect
				id="chest-left"
				x="55"
				y="85"
				width="40"
				height="35"
				rx="8"
				fill={getColor("chest")}
				data-muscle="chest"
			/>
			<rect
				id="chest-right"
				x="105"
				y="85"
				width="40"
				height="35"
				rx="8"
				fill={getColor("chest")}
				data-muscle="chest"
			/>

			{/* ========================================
			    BICEPS (Left and Right)
			    Position: Front of upper arm
			    Designer: Replace with bicep bulge shapes
			    ======================================== */}
			<rect
				id="bicep-left"
				x="35"
				y="95"
				width="18"
				height="45"
				rx="6"
				fill={getColor("biceps")}
				data-muscle="biceps"
			/>
			<rect
				id="bicep-right"
				x="147"
				y="95"
				width="18"
				height="45"
				rx="6"
				fill={getColor("biceps")}
				data-muscle="biceps"
			/>

			{/* ========================================
			    TRICEPS (Left and Right) - Visible from front
			    Position: Back/outer part of upper arm
			    Designer: Replace with tricep shapes (partial view)
			    ======================================== */}
			<rect
				id="tricep-left-front"
				x="28"
				y="98"
				width="10"
				height="40"
				rx="4"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>
			<rect
				id="tricep-right-front"
				x="162"
				y="98"
				width="10"
				height="40"
				rx="4"
				fill={getColor("triceps")}
				data-muscle="triceps"
			/>

			{/* ========================================
			    FOREARMS (Left and Right)
			    Position: Lower arm, elbow to wrist
			    Designer: Replace with forearm shapes
			    ======================================== */}
			<rect
				id="forearm-left"
				x="25"
				y="145"
				width="20"
				height="50"
				rx="6"
				fill={getColor("forearms_front")}
				data-muscle="forearms_front"
			/>
			<rect
				id="forearm-right"
				x="155"
				y="145"
				width="20"
				height="50"
				rx="6"
				fill={getColor("forearms_front")}
				data-muscle="forearms_front"
			/>

			{/* ========================================
			    ABS (Rectus Abdominis)
			    Position: Center of torso, below chest
			    Designer: Replace with 6-pack shape or single ab region
			    ======================================== */}
			<rect
				id="abs"
				x="80"
				y="125"
				width="40"
				height="65"
				rx="6"
				fill={getColor("abs")}
				data-muscle="abs"
			/>

			{/* ========================================
			    OBLIQUES (Left and Right)
			    Position: Sides of torso, flanking abs
			    Designer: Replace with oblique muscle shapes
			    ======================================== */}
			<rect
				id="oblique-left"
				x="58"
				y="130"
				width="20"
				height="55"
				rx="4"
				fill={getColor("obliques")}
				data-muscle="obliques"
			/>
			<rect
				id="oblique-right"
				x="122"
				y="130"
				width="20"
				height="55"
				rx="4"
				fill={getColor("obliques")}
				data-muscle="obliques"
			/>

			{/* ========================================
			    HIP FLEXORS (Left and Right)
			    Position: Front of hip, where leg meets torso
			    Designer: Replace with hip flexor region shapes
			    ======================================== */}
			<rect
				id="hip-flexor-left"
				x="65"
				y="190"
				width="20"
				height="25"
				rx="4"
				fill={getColor("hip_flexors")}
				data-muscle="hip_flexors"
			/>
			<rect
				id="hip-flexor-right"
				x="115"
				y="190"
				width="20"
				height="25"
				rx="4"
				fill={getColor("hip_flexors")}
				data-muscle="hip_flexors"
			/>

			{/* ========================================
			    ADDUCTORS (Left and Right)
			    Position: Inner thigh
			    Designer: Replace with inner thigh shapes
			    ======================================== */}
			<rect
				id="adductor-left"
				x="78"
				y="220"
				width="18"
				height="60"
				rx="4"
				fill={getColor("adductors")}
				data-muscle="adductors"
			/>
			<rect
				id="adductor-right"
				x="104"
				y="220"
				width="18"
				height="60"
				rx="4"
				fill={getColor("adductors")}
				data-muscle="adductors"
			/>

			{/* ========================================
			    QUADS (Left and Right)
			    Position: Front of thigh
			    Designer: Replace with quad muscle group shapes
			    ======================================== */}
			<rect
				id="quad-left"
				x="55"
				y="215"
				width="25"
				height="90"
				rx="8"
				fill={getColor("quads")}
				data-muscle="quads"
			/>
			<rect
				id="quad-right"
				x="120"
				y="215"
				width="25"
				height="90"
				rx="8"
				fill={getColor("quads")}
				data-muscle="quads"
			/>

			{/* ========================================
			    TIBIALIS / SHINS (Left and Right)
			    Position: Front of lower leg
			    Designer: Replace with shin/tibialis shapes
			    ======================================== */}
			<rect
				id="tibialis-left"
				x="60"
				y="315"
				width="18"
				height="55"
				rx="6"
				fill={getColor("tibialis")}
				data-muscle="tibialis"
			/>
			<rect
				id="tibialis-right"
				x="122"
				y="315"
				width="18"
				height="55"
				rx="6"
				fill={getColor("tibialis")}
				data-muscle="tibialis"
			/>
		</svg>
	);
}
