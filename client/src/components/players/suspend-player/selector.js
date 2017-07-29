import { createSelector } from 'reselect';

const getPlayer = state => state.player.selected;
const getSuspensionId = (state, props) => props.match.params.suspensionId;

export const getNewFormVals = () =>
	createSelector(
		[getPlayer],
		player => {
			const { suspensions, currentSeason, _id } = player;
			const selectedSeasonId = currentSeason[0]._id
			let index = 0;

			while (index < suspensions.length) {
				if (suspensions[index].season._id === selectedSeasonId) {
					break;
				} else {
					index++
				}
			}

			return {
				initialValues: {
					selectedSeasonId,
					index,
					playerId: _id
				},
				suspensions
			}
		}
	)



export const getEditFormVals = () => 
	createSelector(
		[getPlayer, getSuspensionId],
		(player, suspensionId) => {
			const { suspensions } = player;
			let suspension = null;
			let index = -1;
						
			while (!suspension) {
				index++;
			
				if (index >= suspensions.length) break;
				
				let records = suspensions[index].records;

				for (let j = 0; j < records.length; j++) {
					if (records[j]._id === suspensionId) {
						suspension = records[j];
						suspension.selectedSeasonId = suspension.season;
						suspension.start = new Date(suspension.start);
						suspension.end = new Date(suspension.end); 
						suspension.index = index;
						suspension.recordIndex = j;
						break;
					}
				}
			}

			return {
				initialValues: suspension,
				suspensions
			}
		}
	)