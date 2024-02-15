import { IBriefs } from "../brief/briefApiRequest";

export interface ICaseNotes {
  id: string;
  case_id: string;
  title: string;
  body: string;
  date: string;
  authour: string;
  brief: IBriefs;
}
