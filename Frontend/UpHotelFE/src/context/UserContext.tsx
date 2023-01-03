/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, FC, useEffect, useState } from "react";
import { getData } from "../constants/Storage";
import { User } from "../Models/User";
import { Login } from "../pages/Login/Login";
import { UserAPI } from "./API/UserAPI";
axios.defaults.withCredentials = true;
type UserContextType = {
    user: User;
    login: any;
    logOut: any;
    getStaff: any;
    addStaff: any;
    // setUser: any;
    // addUser: any;
}

export const UserContext  = createContext<UserContextType>(null);

export const UserProvider : FC = (props: {children}) => {
	// const { children } = props;
	const userAPI = new UserAPI();
	const [user, setUser] = useState<User>({
		firstName : "",
		lastName : "",
		email : "",
		id : 0,
		role : ""
	});
	const navigator = useNavigation();
	const login = async (email: string, password: string) => {
		const response = await userAPI.login(email, password);
		if (response !== false) {
			const user = {email: response.email, role: response.role, name: response.name};
			setUser(user);
			if(user.role === "Admin") {
				navigator.navigate("AdminDashboard", {});
			}
			// try {
			// 	RoomContext.getRoom();
			// } catch (error) {
			// 	console.log(error);
			// }
		}
		else {
			console.log("response", response);
		}
	};
	const logOut = () => {
		const response = userAPI.logOut();
		if (response !== false) {
			navigator.navigate("Login", {});
		}
	};
	const addStaff = ()=> {
		const response = await userAPI.addStaff();
		if(response !== false) {
			navigator.navigate("AdminDashboard", {});
		}
	};

	const getStaff = () => {
		const response = userAPI.getStaff();
		if(response) {
			return response;

		}
	};
	const ctx: UserContextType = {
		user: user,
		login: (email: string, password: string) => login(email, password),
		logOut: () => logOut(),
		getStaff: () => getStaff(),
        addStaff: () => addStaff();
		// setUser: (newUser: User) => setUser(newUser),
		// addUser: () => addUser(),
	};
	return <UserContext.Provider value={ctx}>{props.children}</UserContext.Provider>;
};