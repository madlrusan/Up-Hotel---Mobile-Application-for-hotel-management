import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { baseUrl } from "../../constants/APIUrls";
import { getData, storeData } from "../../constants/Storage";
import jwt_decode from "jwt-decode";
const parseJwt = (token) => {
	try {
		return jwt_decode(token);
	} catch (e) {
		return null;
	}
};
export class UserAPI {
	baseUrl : string;
	_endpoints: Endpoints;

	constructor() {
		this._endpoints = {};
		this.baseUrl = baseUrl;
		this._endpoints = {
			login: "/api/auth/login",
			getUser: "/api/auth/user",
			getStaff: "/api/auth/staff",
			addStaff: "/api/auth/user",
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
			return user;
		} else {
			const content = await response.json();

			showMessage({
				message: content.message,
				type: "warning",
			});
			console.log(content);
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
		return content;
	};  

	addStaff = async () => {
		const response = await fetch(this.baseUrl + this._endpoints.addStaff, {
			method: "post",
			credentials: "include",
			headers:{
				"Content-Type": "application/json",
				Authorization: "Bearer " + (await getData("token")),
			}
		});
		const content = await response.json();
		if (content.status === 401) {
			throw "Unauthorized";
		}
		return content;
	};

}