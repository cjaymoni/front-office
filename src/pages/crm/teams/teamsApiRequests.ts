import { IStaff } from "../../staff/staffApiRequests";

export interface ITeams {
  name: string;
  description: string;
  Team: string;
  staffs: IStaff[];
}
