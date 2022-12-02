import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  AdminDashboard: undefined;
  AddNewStaff : undefined;
  ReceptionistDashboard: undefined;
  CheckIn: undefined;
  CheckOut: undefined;
  HouseKeeper: undefined;
  Room: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
