import { IMatters } from "../matter/matterApiRequest";

export interface ICaseNotes {
  id: string;
  case_id: string;
  title: string;
  body: string;
  date: string;
  authour: string;
  matter: IMatters;
}
