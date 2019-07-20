// import { AsyncStorage } from 'react-native';
import {
	PHONE_NUMBER_CHANGED,
	SENDING_CONTACT_INVITE,
	CONTACT_INVITED_SUCCESSFULLY,
	CONTACT_INVITE_FAILED,
	CHECKING_CONTACTS_REGISTRATION,
	CONTACTS_CHECKED,
} from './actions';

let initialState = {
	contacts: [],
	loading: false,
	invite: {
		sent: false,
		loading: false,
		phoneNumber: '',
		error: {
			error: false,
			message: '',
		},
	},
};

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case CHECKING_CONTACTS_REGISTRATION:
			return { ...state, loading: true };
		case CONTACTS_CHECKED:
			return { ...state, loading: false, contacts: payload };

		case PHONE_NUMBER_CHANGED:
			return {
				...state,
				invite: { ...state.invite, phoneNumber: payload, sent: false },
			};
		case SENDING_CONTACT_INVITE:
			return { ...state, invite: { ...state.invite, loading: true } };
		case CONTACT_INVITED_SUCCESSFULLY:
			return {
				...state,
				invite: {
					...state.invite,
					loading: false,
					sent: true,
					phoneNumber: '',
					error: {
						error: false,
						message: '',
					},
				},
			};

		case CONTACT_INVITE_FAILED:
			return {
				...state,
				invite: {
					...state.invite,
					error: {
						error: true,
						message: payload ? payload : 'Something went wrong',
					},
				},
			};
		default:
			return state;
	}
}
