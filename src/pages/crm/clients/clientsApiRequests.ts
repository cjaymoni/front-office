import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { ISector } from "../../sectors/sectorApiRequest";
import { IPracticeArea } from "../../practice-areas/practiceAreasApiRequest";
import { IStaff } from "../../staff/staffApiRequests";
import { IContact } from "../contacts/contactsApiRequests";
import { IConsultation } from "../consultations/consultationsApiRequests";
import { IActions } from "../actions/actionsApiRequests";

const clientsEndpoint = "crm/clients";

export const fetchClientsRequest = () => {
  return axiosInstance
    .get(clientsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewClientsRequest = (clientsData: any) => {
  return axiosInstance
    .post(clientsEndpoint, clientsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Client added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/crm/clients");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateClientsRequest = (clientsData: any, clientsId: string) => {
  return axiosInstance
    .put(`${clientsEndpoint}/${clientsId}`, clientsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Client has been updated",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteClientsRequest = (clientsId: string) => {
  return axiosInstance
    .delete(`${clientsEndpoint}/${clientsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Client has been removed",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.reload();
        });
      }

      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getClientsByIdRequest = (clientsId: string) => {
  return axiosInstance
    .get(`${clientsEndpoint}/${clientsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IClient {
  client_type?: string;
  client_registration_number?: string;
  client_name: string;
  name_of_authourized_representative?: string;
  mailing_address: string;
  occupation?: string;
  principal_business_activity?: string;
  names_of_directors_or_partners?: string;
  name_of_employer?: string;
  registered_office?: string;
  residential_address?: string;
  tin_number?: string;
  business_phone_number?: string;
  cellphone_number: string;
  corporate_email?: string;
  personal_email?: string;
  opposing_party_name?: string;
  opposing_party_lawyer?: number;
  status?: string;
  contacts?: IContact[];
  relationship_managers?: IStaff[];
  consultation?: IConsultation[];
  id?: string;
  sectors?: ISector[];
  practice_areas?: IPracticeArea[];
  actions?: IActions[];
}
