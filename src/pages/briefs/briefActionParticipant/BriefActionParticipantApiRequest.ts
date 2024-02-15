import { IStaff } from "../../staff/staffApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefsActions } from "../briefsActions/briefActionsApiRequest";

const briefActionParticipantsEndpoint = "brief-actions-participant";

export const fetchBriefActionParticipantsRequest = () => {
  return axiosInstance
    .get(briefActionParticipantsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefActionParticipantsRequest = (
  briefActionParticipantsData: any
) => {
  return axiosInstance
    .post(briefActionParticipantsEndpoint, briefActionParticipantsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Action Participant added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-actions/brief");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefActionParticipantsRequest = (
  briefActionParticipantsData: any,
  briefActionParticipantsId: string
) => {
  return axiosInstance
    .put(
      `${briefActionParticipantsEndpoint}/${briefActionParticipantsId}`,
      briefActionParticipantsData
    )
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Action Participant has been updated",
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

export const deleteBriefActionParticipantsRequest = (
  briefActionParticipantsId: string
) => {
  return axiosInstance
    .delete(`${briefActionParticipantsEndpoint}/${briefActionParticipantsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Action Participant has been removed",
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

export const getBriefActionParticipantsByIdRequest = (
  briefActionParticipantsId: string
) => {
  return axiosInstance
    .get(`${briefActionParticipantsEndpoint}/${briefActionParticipantsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsActionParticipant {
  brief_action_id: string;
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string;
  organization: string;
  designation: string;
  participation: string;

  brief: IBriefs;
}
