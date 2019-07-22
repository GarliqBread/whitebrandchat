import { AsyncStorage } from 'react-native';
import Constants from '../../config/Constants';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../Login/actions';
import { JWT_REHIDRATION_SUCCESSFUL } from './actions';
import { toUserId } from '../../helpers/jwt';

let initialState = null;

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case JWT_REHIDRATION_SUCCESSFUL:
			return payload;
		case USER_LOGIN_SUCCESS: {
			AsyncStorage.setItem(
				Constants.localStorageJwtKey,
				JSON.stringify({ ...payload, id: toUserId(payload.jwt) })
			);
			return { ...payload, id: toUserId(payload.jwt) };
		}
		case USER_LOGOUT: {
			AsyncStorage.removeItem(Constants.localStorageJwtKey);
			return null;
		}
		default:
			return state;
	}
}
