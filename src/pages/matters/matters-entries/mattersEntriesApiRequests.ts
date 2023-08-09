import { IMatters } from "../matter/matterApiRequest";
import { IMattersActivity } from "../matters-activity/mattersActivityApiRequests";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const matterEntriesEndpoint = "matter-entries";

export const fetchMatterEntriesRequest = () => {
  return axiosInstance
    .get(matterEntriesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterEntriesRequest = (matterEntriesData: any) => {
  return axiosInstance
    .post(matterEntriesEndpoint, matterEntriesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Matter Entry added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matter-entries");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterEntriesRequest = (
  matterEntriesData: any,
  matterEntriesId: string
) => {
  return axiosInstance
    .put(`${matterEntriesEndpoint}/${matterEntriesId}`, matterEntriesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Entry has been updated",
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

export const deleteMatterEntriesRequest = (matterEntriesId: string) => {
  return axiosInstance
    .delete(`${matterEntriesEndpoint}/${matterEntriesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Entry has been removed",
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

export const getMatterEntriesByIdRequest = (matterEntriesId: string) => {
  return axiosInstance
    .get(`${matterEntriesEndpoint}/${matterEntriesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersEntries {
  id: string;
  matter_id: string;
  title: string;
  description: string;
  activity_code_id: string;
  start_time: string;
  end_time: string;
  matter: IMatters;
  activity: IMattersActivity;
}
