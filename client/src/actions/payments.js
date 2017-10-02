import axios from 'axios';
import { reset } from 'redux-form';
import { 
	UPDATE_PLAYER_INFO,
	ROOT_URL,  
} from './constants';


export function processPayment(kind) {
	return function(values, dispatch) {

		if (!values.season) {
			return newPayment(values, dispatch, kind);
		}

		const url = `${ROOT_URL}/player/update`;

		const { _id, season, context } = values; 
		const { quarter, year, team } = season;
		const amount = parseFloat(values.amount) * 100;
		const payment = { 
			amount,  
			quarter, 
			year,
			kind
		};
		const url2 = `${ROOT_URL}/season/checkins?team1=${season._id}&team2=${season._id}`;
		
		if (kind === 'payment') {
			payment.paymentType = values.paymentType;
		} else {
			payment.reason = values.reason;
		}

		const query = { _id };
		const update = {
			$push: { payments: payment }
		}
				
		dispatch({type: 'CLOSE_MODAL'});

		axios.put(url, { query, update })
			.then(() => axios.get(url2))
			.then(res => {
				const { players, totalComped, totalPaid } = res.data[0];
			
				dispatch({
					type: 'UPDATE_GAME_PAYMENT',
					payload: {
						players,
						totalPaid,
						totalComped
					}
				})
			})
			.catch(e => console.log({error: e}))
			// .then(() => {
			// 	if (context === 'game') {
			// 		dispatch({
			// 			type: 'GAMETIME_PAYMENT',
			// 			category: kind === 'payment'? 'paid' : 'comped',
			// 			playerId: _id,
			// 			team,
			// 			payment
			// 		})
			// 	}			
			// })
	}
}

export function deletePayment({val, index, i}) {
	const url = `${ROOT_URL}/player/update`;

	const category = val.kind === 'payment'? 'payments' : 'comps';
	const total = val.kind === 'payment' ? 'totalPaid' : 'totalComped';
	const query = { 'payments._id' : val._id };
	const update = { 
		$pull: { 
			payments: {_id: {$in: [ val._id] }}
		}
	};
	
	return (dispatch, getState) => {
		const { payments } = getState().player.selected;
		payments[index][category].splice(i, 1);
		payments[index][total] -= val.amount;
		console.log({payments, category, val, i, index });

		axios.put(url, { query, update })
			.then(() => 
				dispatch({
					type: UPDATE_PLAYER_INFO, 
					payload: payments, 
					category: 'payments'
				})
			).then(() => dispatch({ type: 'CLOSE_MODAL' }))	
	}
}


export function newPayment(values, dispatch, kind) {
	const url = `${ROOT_URL}/player/payment/${values.playerId}`;


	const amount = parseFloat(values.amount) * 100;
	const payment = { 
		amount, 
		kind,
		reason: values.reason,
		paymentType: values.paymentType, 
		quarter: values.quarter, 
		year: values.year,		 
	};

	dispatch({type: 'CLOSE_MODAL'});

	axios.put(url, payment)
		.then(({data}) => 
			dispatch({ type: 'ADD_PAYMENT', payment: data })
		)
}


export function updatePayment(form, dispatch, props){
	const url = `${ROOT_URL}/player/update`;

	const amount = parseFloat(form.amount) * 100;

	const query = { 'payments._id' : form._id };
	const update = { 
		$set: { 
			'payments.$.amount': amount,
			'payments.$.paymentType': form.paymentType 
		}
	};

	console.log(form);
	
	axios.put(url, { query, update })
		.then(() => 
			dispatch({
				type: 'EDIT_PAYMENT', 
				payment: {...form, amount },
				paymentIndex: [props.index, props.i]
			})
		).then(() => dispatch({ type: 'CLOSE_MODAL' }))

}



