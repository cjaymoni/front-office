import { ICourts } from "../courts/courtsApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
export interface ICases {
  id: string;
  brief_id: string;
  suite_number: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
  brief: IBriefs[];
  courts: ICourts[];
}
