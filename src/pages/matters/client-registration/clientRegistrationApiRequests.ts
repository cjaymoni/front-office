import { IStaff } from "../../staff/staffApiRequests";

export interface IClientRegistration {
  id: string;
  client_type: string;
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
  registration_date: string;

  creator_id: string;
  updator_id: string;

  created_by: IStaff;

  updated_by: IStaff;
}
