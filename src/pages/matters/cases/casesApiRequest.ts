import { ICourts } from "../courts/courtsApiRequests";
import { IMatters } from "../matter/matterApiRequest";
export interface ICases {
  id: string;
  matter_id: string;
  suite_number: string;
  title: string;
  brief: string;
  start_date: string;
  end_date: string;
  status: string;
  matter: IMatters[];
  courts: ICourts[];
}
