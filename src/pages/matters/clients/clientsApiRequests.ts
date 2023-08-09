import { IStaff } from "../../staff/staffApiRequests";
import { IMatters } from "../matter/matterApiRequest";

export interface IClients {
  id: string;
  client_type: string;
  client_registration_number: string;
  client_name: string;
  name_of_authourized_representative: string;
  mailing_address: string;
  occupation: string;
  principal_business_activity: string;
  names_of_directors_or_partners: string;
  name_of_employer: string;
  registered_office: string;
  residential_address: string;
  tin_number: string;
  business_phone_number: string;
  cellphone_number: string;
  corporate_email: string;
  personal_email: string;
  opposing_party_name: string;
  opposing_party_lawyer: string;
  status: string;
  creator_id: string;
  updator_id: string;
  matters: IMatters[];
  created_by: IStaff;
  updated_by: IStaff;
}
