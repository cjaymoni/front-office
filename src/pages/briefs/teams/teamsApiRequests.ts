import { IStaff } from "../../staff/staffApiRequests";
import { IBriefLitigation } from "../briefs-litigation/briefsLitigationApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const teamEndpoint = "briefs";

export const fetchTeamsRequest = () => {
  return axiosInstance
    .get(teamEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewTeamRequest = (teamData: any) => {
  return axiosInstance
    .post(teamEndpoint, teamData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Team added successfully",
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

export const updateTeamRequest = (teamData: any, teamId: string) => {
  return axiosInstance
    .put(`${teamEndpoint}/${teamId}`, teamData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Team has been updated",
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

export const deleteTeamRequest = (teamId: string) => {
  return axiosInstance
    .delete(`${teamEndpoint}/${teamId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Team has been removed",
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

export const getTeamByIdRequest = (teamId: string) => {
  return axiosInstance
    .get(`${teamEndpoint}/${teamId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface ITeam {
  id?: string;
  name: string;
  user_id: IStaff[];
  litigation_id: string;
  litigation: IBriefLitigation;
}
