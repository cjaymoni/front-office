import { ICourts } from "../courts/courtsApiRequests";

export interface IDistricts {
  id: string;
  name: string;
  region_id: string;
  code: string;
  courts: ICourts[];
}
