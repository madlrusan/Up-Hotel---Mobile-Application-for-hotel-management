/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, FC, useEffect, useState } from "react";
import { getData, storeData } from "../constants/Storage";
import { RoomStatus } from "../Models/types";
import { User } from "../Models/User";
import { Login } from "../pages/Login/Login";
import { UserAPI } from "./API/UserAPI";
import { RoomDashboard } from "../constants/model";
axios.defaults.withCredentials = true;
type UserContextType = {
  user: User;
  login: (email: string, password: string) => void;
  logOut: () => void;
  getStaff: () => void;
  addStaff: (firstName: string,
		lastName: string,
		email: string,
		role: string) => void;
  changeRoomStatus: (id: number|string, status: RoomStatus) => void;
  checkIn: (
    firstName: string,
    lastName: string,
    emailAddress: string,
    roomId: number|string
  ) => void;
    getRooms: ()=> Promise<RoomDashboard[]>;
  getUserByRoomId: (roomId: number|string) => void;
  checkOut: (roomId: number|string) => void;

  // setUser: any;
  // addUser: any;
};

export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC = (props: { children }) => {
	// const { children } = props;
	const userAPI = new UserAPI();
	const [user, setUser] = useState<User>({
		firstName: "",
		lastName: "",
		email: "",
		id: 0,
		role: "",
	});
	const navigator = useNavigation();
	const login = async (email: string, password: string) => {
		const response = await userAPI.login(email, password);
		if (response !== false) {
			const user = {
				id: response.id,
				firstName: response.firstName,
				lastName: response.lastName,
				email: response.email,
				role: response.role,
				name: response.name,
			};
			setUser(user);
			if (user.role === "Admin") {
				navigator.navigate("AdminDashboard", {});
			} else if (user.role === "Housekeeping") {
				navigator.navigate("HouseKeeper", {});
			} else if (user.role === "Room") {
				navigator.navigate("Room", {});
			} else if (user.role === "Reception") {
				navigator.navigate("ReceptionistDashboard", {});
			}
			if(user.role === "Room") {
				await storeData("roomName", response.roomName);
				await storeData("roomId", response.roomId);
			}
		} else {
			console.log("response", response);
		}
	};
	const logOut = () => {
		const response = userAPI.logOut();
		// if (response !== false) {
		navigator.navigate("Login", {});
		// }
	};
	const addStaff = async (
		firstName: string,
		lastName: string,
		email: string,
		role: string
	) => {
		const response = await userAPI.addStaff(firstName, lastName, email, role);
		return await response;
	};

	const getStaff = async () => {
		const response: any = await userAPI.getStaff();

		if (response !== null) {
			return await response;
		}
	};
	const getRooms = async () => {
		const response = await userAPI.getRooms();
		if( response !== null ) {
			return await response;
		}
	};
	const changeRoomStatus = async (id: number|string, status: RoomStatus) => {
		const response = await userAPI.changeRoomStatus(id, status);
		return await response;
	};
	const checkIn = async (
		firstName: string,
		lastName: string,
		emailAddress: string,
		roomId: number
	) => {
		const response = await userAPI.checkIn(
			firstName,
			lastName,
			emailAddress,
			roomId
		);
		return await response;
	};
	const getUserByRoomId = async (roomId: number) => {
		const response: any = await userAPI.getUserByRoomId(roomId);

		return await response;
	};
	const checkOut = async (roomId: number) => {
		const response = await userAPI.checkOut(roomId);
		return await response;
	};
	const ctx: UserContextType = {
		user: user,
		login: (email: string, password: string) => login(email, password),
		logOut: () => logOut(),
		getStaff: () => getStaff(),
		addStaff: (
			firstName: string,
			lastName: string,
			email: string,
			role: string
		) => addStaff(firstName, lastName, email, role),
		changeRoomStatus: (id: number|string, status: RoomStatus) => changeRoomStatus(id, status),
		checkIn: (
			firstName: string,
			lastName: string,
			emailAddress: string,
			roomId: number
		) => checkIn(firstName, lastName, emailAddress, roomId),
		getRooms : () => getRooms(),
		checkOut: (roomId: number) => checkOut(roomId),
		getUserByRoomId: (roomId: number) => getUserByRoomId(roomId),
		// setUser: (newUser: User) => setUser(newUser),
		// addUser: () => addUser(),
	};
	
	return (
		<UserContext.Provider value={ctx}>{props.children}</UserContext.Provider>
);
};

