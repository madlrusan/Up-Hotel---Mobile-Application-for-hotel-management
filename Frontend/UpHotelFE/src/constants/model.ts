import { RoomStatus } from "../Models/types";

export interface AdminDashBoardUsers  {
    email : string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
}
export interface RoomDashboard {
    id: number;
    name: string;
    status: RoomStatus;
}