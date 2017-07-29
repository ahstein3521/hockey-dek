import axios from 'axios';
import { reset } from 'redux-form';
import { 
	UPDATE_PLAYER_INFO,
	ROOT_URL,  
} from './constants';



export function createPayment(form, dispatch, props){
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



