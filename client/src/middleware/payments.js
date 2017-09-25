export function addPayment(action, dispatch, getState) {

	const { kind, amount, quarter, year } = action.payment;
	const playerPayments = getState().player.selected.payments;
	const paymentObject = playerPayments.find(v => 
		v.season.quarter === quarter && v.season.year === year)
	const d = new Date();
	
	action.payment.date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
	action.payment.type = action.payment.paymentType;

	if (kind === 'payment') {
		paymentObject.totalPaid += amount;
		paymentObject.payments.push(action.payment)
	} else {
		paymentObject.totalComped += amount;
		paymentObject.comps.push(action.payment);
	}

	dispatch({ 
		type: 'UPDATE_PLAYER_INFO', 
		category: 'payments', 
		payload: playerPayments 
	})
}

export function editPayment(action, dispatch, getState) {
	const playerPayments = getState().player.selected.payments;
	const { currAmount, ...payment } = action.payment;
	const [i, j] = action.paymentIndex;

	if (payment.kind === 'payment') {
		playerPayments[i].totalPaid -= currAmount;
		playerPayments[i].totalPaid += payment.amount;
		playerPayments[i].payments.splice(j, 1, payment)
	} else {
		playerPayments[i].totalComped -= currAmount;
		playerPayments[i].totalComped += payment.amount;
		playerPayments[i].comps.splice(j, 1, payment)
	}		
	
	dispatch({ 
		type: 'UPDATE_PLAYER_INFO', 
		category: 'payments', 
		payload: playerPayments 
	})
}