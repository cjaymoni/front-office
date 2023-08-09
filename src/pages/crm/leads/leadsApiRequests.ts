import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { ISector } from "../../sectors/sectorApiRequest";
import { IPracticeArea } from "../../practice-areas/practiceAreasApiRequest";
import { IStaff } from "../../staff/staffApiRequests";
import { IContact } from "../contacts/contactsApiRequests";
import { IAttachment } from "../attachments/attachmentsApiRequests";
import { IComment } from "../comments/commentsApiRequests";

const leadsEndpoint = "crm/leads";

export const fetchLeadsRequest = () => {
  return axiosInstance
    .get(leadsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewLeadsRequest = (leadsData: any) => {
  return axiosInstance
    .post(leadsEndpoint, leadsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Lead added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/crm/leads");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateLeadsRequest = (leadsData: any, leadsId: string) => {
  return axiosInstance
    .put(`${leadsEndpoint}/${leadsId}`, leadsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Lead has been updated",
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

export const deleteLeadsRequest = (leadsId: string) => {
  return axiosInstance
    .delete(`${leadsEndpoint}/${leadsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Lead has been removed",
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

export const getLeadsByIdRequest = (leadsId: string) => {
  return axiosInstance
    .get(`${leadsEndpoint}/${leadsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface ILeads {
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
  created_id: string;
  updator_id?: string;
  id?: string;
  sectors: ISector[];
  practice_areas: IPracticeArea[];
  attachments: IAttachment[];
  contacts: IContact[];
  account_managers: IStaff[];
  comments: IComment[];
}
