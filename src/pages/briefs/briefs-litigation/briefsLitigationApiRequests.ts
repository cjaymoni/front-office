import Swal from "sweetalert2";
import { axiosInstance } from "../../../utils/api-util";
import { IClient } from "../../crm/clients/clientsApiRequests";
import { IStaff } from "../../staff/staffApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
import { IBriefsDocuments } from "../briefs-documents/briefsDocumentsApiRequest";
import { IBriefsTasks } from "../briefs-tasks/briefsTasksApiRequests";
import { ICourts } from "../courts/courtsApiRequests";
import { IOpposingParty } from "../opposing-party/opposingPArtyApiRequests";

const briefsLitigationEndpoint = "briefs";

export const fetchBriefsLitigationRequest = () => {
  return axiosInstance
    .get(briefsLitigationEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefsLitigationRequest = (briefsData: any) => {
  return axiosInstance
    .post(briefsLitigationEndpoint, briefsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Litigation added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/briefs/litigations");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefsLitigationRequest = (
  briefsData: any,
  briefsLitigation: string
) => {
  return axiosInstance
    .put(`${briefsLitigationEndpoint}/${briefsLitigation}`, briefsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Litigation has been updated",
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

export const deleteBriefsLitigationRequest = (briefsLitigation: string) => {
  return axiosInstance
    .delete(`${briefsLitigationEndpoint}/${briefsLitigation}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Litigation has been removed",
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

export const getBriefsLitigationByIdRequest = (briefslitigationId: string) => {
  return axiosInstance
    .get(`${briefsLitigationEndpoint}/${briefslitigationId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IBriefLitigation {
  id?: string;
  brief_id: string;
  suite_number: string;
  title: string;
  description: string;
  client_id: string;
  client: IClient;
  category_id: string;
  lawyer_id: string;
  lawyer: IStaff;
  staff: IStaff;
  documents: IBriefsDocuments[];
  tasks: IBriefsTasks[];
  trials: IBriefsTrials[];
  background: string;
  start_date: string;
  end_date: string;
  status: string;
  courts: ICourts[];
  brief: IBriefs;
  category: IBriefLitigationCategory;
  opposing_parties: IOpposingParty[];
}
export interface IBriefLitigationCategory {
  id?: string;
  name: string;
  description: string;
  litigations: IBriefLitigation[];
}

export interface IBriefLitigationTag {
  id?: string;
  name: string;
  description: string;
  litigations: IBriefLitigation[];
}

export interface IBriefsTrials {
  id?: string;
  litigation_id: string;
  litigation: IBriefLitigation;
  court_id: string;
  court: ICourts;
  date: string;
  description: string;
  outcome: string;
  status: string;
  title: string;
  documents: IBriefsDocuments[];
}
