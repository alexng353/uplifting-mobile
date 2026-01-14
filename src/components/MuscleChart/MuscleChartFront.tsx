/**
 * FRONT VIEW MUSCLE CHART SVG
 * Paths extracted from anatomy reference image
 */

import { MUSCLE_PATHS } from "./muscle-paths";

interface Props {
	getColor: (muscleId: string) => string;
}

export function MuscleChartFront({ getColor }: Props) {
	return (
		<svg viewBox="0 0 200 400" className="muscle-chart-svg" role="img">
			<title>Front view muscle chart</title>

			{/* Transform group - converts potrace coordinates to viewBox */}
			<g transform="translate(0,400) scale(0.1,-0.1)">
				{/* Chest */}
				<path
					d={MUSCLE_PATHS.chest}
					fill={getColor("chest")}
					data-muscle="chest"
				/>

				{/* Quads */}
				<path
					d={MUSCLE_PATHS.quads}
					fill={getColor("quads")}
					data-muscle="quads"
				/>

				{/* Biceps */}
				<path
					d={MUSCLE_PATHS.biceps}
					fill={getColor("biceps")}
					data-muscle="biceps"
				/>

				{/* Abs */}
				<path d={MUSCLE_PATHS.abs} fill={getColor("abs")} data-muscle="abs" />

				{/* Obliques */}
				<path
					d={MUSCLE_PATHS.obliques}
					fill={getColor("obliques")}
					data-muscle="obliques"
				/>
			</g>
		</svg>
	);
}
