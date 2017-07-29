
export default function(values) {
	const warnings = {};
	const { season, selectedSeasonId } = values;
	
	if (season && selectedSeasonId !== season) {
		warnings.selectedSeasonId = 'Are you sure you want to move this record into another season?';
	}

	return warnings;
}
