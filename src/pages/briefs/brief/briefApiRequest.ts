import { IClient } from "../../crm/clients/clientsApiRequests";
import { IPracticeArea } from "../../practice-areas/practiceAreasApiRequest";
import { ISector } from "../../sectors/sectorApiRequest";
import { IStaff } from "../../staff/staffApiRequests";
import { ICases } from "../cases/casesApiRequest";
import { ICourts } from "../courts/courtsApiRequests";
import { IExpenses } from "../expenses/expensesApiRequests";
import { IBriefsTasks } from "../briefs-tasks/briefsTasksApiRequests";
import { IBriefsType } from "../briefs-type/briefsTypeApiRequests";
import { IOpposingPartyLawyer } from "../opposing-party-lawyers/opposingPartyLawyerApiRequests";
import { IOpposingParty } from "../opposing-party/opposingPArtyApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefsCategory } from "../briefs-category/briefsCategoryApiRequests";
import { IBriefsEntries } from "../briefs-entries/briefsEntriesApiRequests";
import { IBriefsNotes } from "../briefs-notes/briefsNotesApiRequests";
import { IBriefsActions } from "../briefsActions/mattersActionsApiRequest";

const briefsEndpoint = "briefs";

export const fetchBriefsRequest = () => {
  return axiosInstance
    .get(briefsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefsRequest = (briefsData: any) => {
  return axiosInstance
    .post(briefsEndpoint, briefsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/briefs");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefsRequest = (briefsData: any, briefsId: string) => {
  return axiosInstance
    .put(`${briefsEndpoint}/${briefsId}`, briefsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief has been updated",
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

export const deleteBriefsRequest = (briefsId: string) => {
  return axiosInstance
    .delete(`${briefsEndpoint}/${briefsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief has been removed",
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

export const getBriefsByIdRequest = (briefsId: string) => {
  return axiosInstance
    .get(`${briefsEndpoint}/${briefsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefs {
  id: string;
  reference_number: string;
  brief: string;
  client_id: string;
  authourized_representative: string;
  authourized_representative_email: string;
  authourized_representative_phone: string;
  date_of_engagement: string;
  status: string;
  assistance_required_from_partners: string;
  special_observations_remarks: string;
  fee: number;
  creator_id: string;
  updator_id: string;
  client: IClient;
  created_by: IStaff;
  updated_by: IStaff;
  staffs: IStaff[];
  supervising_partners: IStaff[];
  associates: IStaff[];
  sectors: ISector[];
  practice_areas: IPracticeArea[];
  categories: IBriefsCategory[];
  types: IBriefsType[];
  opposing_party_lawyers: IOpposingPartyLawyer[];
  opposing_parties: IOpposingParty[];
  expenses: IExpenses[];
  notes: IBriefsNotes[];
  entries: IBriefsEntries[];
  actions: IBriefsActions[];
  brief_tasks: IBriefsTasks[];
  courts: ICourts[];
  cases: ICases[];
}
