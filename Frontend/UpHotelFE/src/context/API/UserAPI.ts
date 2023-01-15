import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { baseUrl } from "../../constants/APIUrls";
import { getData, storeData } from "../../constants/Storage";
import jwt_decode from "jwt-decode";
import { RoomStatus } from "../../Models/types";
const parseJwt = (token) => {
	try {
		return jwt_decode(token);
	} catch (e) {
		return null;
	}
};
export class UserAPI {
	baseUrl: string;
	_endpoints: Endpoints;

	constructor() {
		this._endpoints = {};
		this.baseUrl = baseUrl;
		this._endpoints = {
			login: "/api/auth/login",
			getUser: "/api/auth/user",
			getStaff: "/api/auth/staff",
			addStaff: "/api/auth/user",
			changeRoomStatus: "/api/rooms/status",
			checkIn: "api/reservations/checkin",
			getRooms: "api/rooms",
			getUserByRoomId: "api/rooms",
			checkOut: "api/reservations/checkout",
		};
	}
	login = async (email: string, password: string) => {
		const response = await fetch(this.baseUrl + this._endpoints.login, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ email, password }),
		}).then();
		if (response.status === 200) {
			const content = await response.json();
			await storeData("token", content.token);
			const user = parseJwt(content.token);
			await storeData("user_role", user.role);
			await storeData("userName", user.name);
			return user;
		} else {
			const content = await response.json();

			showMessage({
				message: content.message,
				type: "warning",
			});
			return false;
		}
	};
	logOut = () => {
		AsyncStorage.removeItem("token");
		showMessage({
			message: "Logout Successful",
			type: "success",
		});
		return true;
	};

	getUser = async () => {
		const response = await fetch(this.baseUrl + this._endpoints.getUser, {
			method: "get",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			},
		});
		const content = await response.json();
		if (content.status === 401) {
			throw "Unauthorized";
		}
		return content;
	};

	getStaff = async () => {
		const response = await fetch(this.baseUrl + this._endpoints.getStaff, {
			method: "get",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			},
		});
		const content = await response.json();
		if (content.status === 401) {
			throw "Unauthorized";
		}
		return await content;
	};
	getRooms = async () => {
		const response = await fetch(this.baseUrl + this._endpoints.getRooms, {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			},
		});
		const content = await response.json();
		if (content.status === 401) {
			throw "Unauthorized";
		}
		return await content;
	};
	addStaff = async (
		firstName: string,
		lastName: string,
		email: string,
		role: string
	) => {
		const response = await fetch(this.baseUrl + this._endpoints.addStaff, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			},
			body: JSON.stringify({ firstName, lastName, email, role }),
		}).then();
		if (response.status === 200) {
			const content = await response.json();
			const staff = parseJwt(content.token);
			return staff;
		} else {
			const content = await response.json();

			showMessage({
				message: content.message,
				type: "warning",
			});
			return false;
		}
	};
	changeRoomStatus = async (id: number, status: RoomStatus) => {
		const roomId = id; //insert room id here
		const response = await fetch(
			this.baseUrl + this._endpoints.changeRoomStatus,
			{
				method: "PUT",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + (await getData("token")),
				},
				body: JSON.stringify({ roomId, status }),
			}
		).then();
		if (response.status === 200) {
			return true;
		} else {
			const content = await response.json();
			showMessage({
				message: content.message,
				type: "warning",
			});
			return false;
		}
	};
	checkIn = async (
		firstName: string,
		lastName: string,
		emailAddress: string,
		roomId: number
	) => {
		const response = await fetch(this.baseUrl + this._endpoints.checkIn, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			},
			body: JSON.stringify({ firstName, lastName, emailAddress, roomId }),
		}).then();
		if (response.status === 200) {
			return true;
		} else {
			const content = await response.json();
			showMessage({
				message: content.message,
				type: "warning",
			});
			return false;
		}
	};
	getUserByRoomId = async (roomsId: number) => {
		const response = await fetch(
			this.baseUrl + this._endpoints.getUserByRoomId + `/${roomsId}`,
			{
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + (await getData("token")),
				},
			}
		).then();
		const content = await response.json();
		if (response.status === 200) {
			return content;
		} else {
			showMessage({
				message: content.message,
				type: "warning",
			});
			return false;
		}
	};
	checkOut = async (roomId: number) => {
		const response = await fetch(this.baseUrl + this._endpoints.checkOut, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			},
			body: JSON.stringify({ roomId }),
		}).then();
		if (response.status === 200) {
			return true;
		} else {
			const content = await response.json();
			showMessage({
				message: content.message,
				type: "warning",
			});
			return false;
		}
	};
}