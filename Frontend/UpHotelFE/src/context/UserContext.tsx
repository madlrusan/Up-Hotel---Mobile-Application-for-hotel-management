/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, FC, ReactNode, useEffect, useState } from "react";
import { User } from "../Models/User";
import { UserAPI } from "./API/UserAPI";
axios.defaults.withCredentials = true;
type UserContextType = {
    user: User;
    login: any;
    logOut: any;
    getUser: any;
    setUser: any;
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
	useEffect(() => {
		const fetch = async () => {
			try {
				getUser();
			} catch (error) {
				// @ts-ignore
				navigator.navigate("Login");
			}
		};
		fetch().then();
	}, []);
	useEffect(() => {
		if (user?.id === -1) {
			// @ts-ignore
			navigator.navigate("Login");
		// } else if (user?.usersToRoomId !== null) {
		// 	// @ts-ignore
		// 	navigator.navigate("Room", {
		// 		usersToRoomId: user.usersToRoomId,
		// 	});
		// } else {
		// 	// @ts-ignore
		// 	navigator.navigate("Home");
		}
	}, [user]);
	const getUser = async () => {
		try {
			const response = await userAPI.getUser();

			setUser(response);
		} catch (e) {
			console.log(e);
		}
	};
	const login = async (email: string, password: string) => {
		const response = await userAPI.login(email, password);
		if (response) {
			setUser(await userAPI.getUser());
			// try {
			// 	RoomContext.getRoom();
			// } catch (error) {
			// 	console.log(error);
			// }
		}
	};
	const logOut = () => {
		const response = userAPI.logOut();
		if (response) {
			// @ts-ignore
			navigator.navigate("Login");
		}
	};

	const ctx: UserContextType = {
		user: user,
		login: (email: string, password: string) => login(email, password),
		logOut: () => logOut(),
		getUser: () => getUser(),
		setUser: (newUser: User) => setUser(newUser),
	};
	return <UserContext.Provider value={ctx}>{props.children}</UserContext.Provider>;
};