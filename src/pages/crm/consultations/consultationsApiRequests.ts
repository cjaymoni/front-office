import { IPracticeArea } from "../../practice-areas/practiceAreasApiRequest";
import { ISector } from "../../sectors/sectorApiRequest";
import { IStaff } from "../../staff/staffApiRequests";
import { IActions } from "../actions/actionsApiRequests";
import { IAttachment } from "../attachments/attachmentsApiRequests";
import { IComment } from "../comments/commentsApiRequests";
import { IContact } from "../contacts/contactsApiRequests";
import { ITeams } from "../teams/teamsApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const consultationsEndpoint = "crm/consultations";

export const fetchConsultationsRequest = () => {
  return axiosInstance
    .get(consultationsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewConsultationsRequest = (consultationsData: any) => {
  return axiosInstance
    .post(consultationsEndpoint, consultationsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Consultation added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/crm/consultations");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateConsultationsRequest = (
  consultationsData: any,
  consultationsId: string
) => {
  return axiosInstance
    .put(`${consultationsEndpoint}/${consultationsId}`, consultationsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Consultation has been updated",
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

export const deleteConsultationsRequest = (consultationsId: string) => {
  return axiosInstance
    .delete(`${consultationsEndpoint}/${consultationsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Consultation has been removed",
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

export const getConsultationsByIdRequest = (consultationsId: string) => {
  return axiosInstance
    .get(`${consultationsEndpoint}/${consultationsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IConsultation {
  description: string;
  salutation: string;
  first_name: string;
  last_name: string;
  primary_email: string;
  secondary_email: string;
  primary_cellphone: string;
  secondary_cellphone: string;
  source_id: string;
  address_line: string;
  street: string;
  city: string;
  state_region: string;
  postcode: string;
  website: string;
  status: string;
  is_active: boolean;
  estimated_value: number;
  probability: number;
  created_by: string;
  updated_by: string;
  id?: string;
  sectors: ISector[];
  practice_areas: IPracticeArea[];
  attachments: IAttachment[];
  contacts: IContact[];
  team_managers: ITeams[];
  account_managers: IStaff[];
  comments: IComment[];
  actions: IActions[];
}
