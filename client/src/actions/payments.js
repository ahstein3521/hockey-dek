import axios from 'axios';
import { reset } from 'redux-form';
import { 
	UPDATE_PLAYER_INFO,
	ROOT_URL,  
} from './constants';


export function processPayment(kind) {
	return function(values, dispatch) {
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
			.then(() => {
				if (context === 'game') {
					dispatch({
						type: 'GAMETIME_PAYMENT',
						category: kind === 'payment'? 'paid' : 'comped',
						playerId: _id,
						team,
						payment
					})
				}			
			})
	}
}

export function newPayment(values, dispatch) {
	const url = `${ROOT_URL}/player/update`;
	const { _id, season, paymentType, context } = values; 
	const { quarter, year, team } = season;
	const amount = parseFloat(values.amount) * 100;
	const payment = { 
		amount, 
		paymentType, 
		quarter, 
		year, 
		kind: 'payment'
	};

	const query = { _id };
	const update = {
		$push: { payments: payment }
	}
	dispatch({type: 'CLOSE_MODAL'});

	axios.put(url, { query, update })
		.then(() => {
			if (context === 'game') {
				dispatch({
					type: 'GAMETIME_PAYMENT',
					category: 'paid',
					playerId: _id,
					team,
					payment
				})
			}			
		})
}


export function updatePayment(form, dispatch, props){
	const url = `${ROOT_URL}/player/update`;
	const { payments } = props;
	const amount = parseFloat(form.amount) * 100;

	const query = { 'payments._id' : form._id };
	const update = { 
		$set: { 
			'payments.$.amount': amount,
			'payments.$.paymentType': form.paymentType 
		}
	};

	for (let i = 0; i < payments.length; i++) {
		if (payments[i].record._id === form._id) {
			payments[i].record = { ...form, amount };
			break;
		}
	}

	axios.put(url, { query, update })
		.then(({data}) => 
			dispatch({
				type: UPDATE_PLAYER_INFO, 
				payload: payments, 
				category: 'payments'
			})
		).then(() => dispatch({ type: 'CLOSE_MODAL' }))

}



