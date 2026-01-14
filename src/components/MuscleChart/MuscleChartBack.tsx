/**
 * BACK VIEW MUSCLE CHART SVG
 * Paths extracted from anatomy reference image
 */

import { MUSCLE_PATHS } from "./muscle-paths";

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartBack({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Back view muscle chart</title>

			{/* Transform group - converts potrace coordinates to viewBox */}
			<g transform="translate(0,400) scale(0.1,-0.1)">
				{/* Traps */}
				<path
					d={MUSCLE_PATHS.traps}
					fill={getColor("traps")}
					data-muscle="traps"
				/>

				{/* Lats */}
				<path
					d={MUSCLE_PATHS.lats}
					fill={getColor("lats")}
					data-muscle="lats"
				/>

				{/* Glutes */}
				<path
					d={MUSCLE_PATHS.glutes}
					fill={getColor("glutes")}
					data-muscle="glutes"
				/>

				{/* Hamstrings */}
				<path
					d={MUSCLE_PATHS.hamstrings}
					fill={getColor("hamstrings")}
					data-muscle="hamstrings"
				/>

				{/* Calves */}
				<path
					d={MUSCLE_PATHS.calves}
					fill={getColor("calves")}
					data-muscle="calves"
				/>

				{/* Triceps */}
				<path
					d={MUSCLE_PATHS.triceps}
					fill={getColor("triceps")}
					data-muscle="triceps"
				/>
			</g>
		</svg>
	);
}
