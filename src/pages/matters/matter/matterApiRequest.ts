import { IClient } from "../../crm/clients/clientsApiRequests";
import { IPracticeArea } from "../../practice-areas/practiceAreasApiRequest";
import { ISector } from "../../sectors/sectorApiRequest";
import { IStaff } from "../../staff/staffApiRequests";
import { ICases } from "../cases/casesApiRequest";
import { ICourts } from "../courts/courtsApiRequests";
import { IExpenses } from "../expenses/expensesApiRequests";
import { IMattersCategory } from "../matters-category/mattersCategoryApiRequests";
import { IMattersEntries } from "../matters-entries/mattersEntriesApiRequests";
import { IMattersNotes } from "../matters-notes/mattersNotesApiRequests";
import { IMattersTasks } from "../matters-tasks/mattersTasksApiRequests";
import { IMattersType } from "../matters-type/mattersTypeApiRequests";
import { IMattersActions } from "../mattersActions/mattersActionsApiRequest";
import { IOpposingPartyLawyer } from "../opposing-party-lawyers/opposingPartyLawyerApiRequests";
import { IOpposingParty } from "../opposing-party/opposingPArtyApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const mattersEndpoint = "matters";

export const fetchMattersRequest = () => {
  return axiosInstance
    .get(mattersEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMattersRequest = (mattersData: any) => {
  return axiosInstance
    .post(mattersEndpoint, mattersData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Matter added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matters/matter");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMattersRequest = (mattersData: any, mattersId: string) => {
  return axiosInstance
    .put(`${mattersEndpoint}/${mattersId}`, mattersData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter has been updated",
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

export const deleteMattersRequest = (mattersId: string) => {
  return axiosInstance
    .delete(`${mattersEndpoint}/${mattersId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter has been removed",
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

export const getMattersByIdRequest = (mattersId: string) => {
  return axiosInstance
    .get(`${mattersEndpoint}/${mattersId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMatters {
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
  categories: IMattersCategory[];
  types: IMattersType[];
  opposing_party_lawyers: IOpposingPartyLawyer[];
  opposing_parties: IOpposingParty[];
  expenses: IExpenses[];
  notes: IMattersNotes[];
  entries: IMattersEntries[];
  actions: IMattersActions[];
  matter_tasks: IMattersTasks[];
  courts: ICourts[];
  cases: ICases[];
}
