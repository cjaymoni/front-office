import { IBriefs } from "../brief/briefApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefsActivity } from "../brief-activity/briefsActivityApiRequests";

const briefEntriesEndpoint = "brief-entries";

export const fetchBriefEntriesRequest = () => {
  return axiosInstance
    .get(briefEntriesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefEntriesRequest = (briefEntriesData: any) => {
  return axiosInstance
    .post(briefEntriesEndpoint, briefEntriesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Entry added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-entries");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefEntriesRequest = (
  briefEntriesData: any,
  briefEntriesId: string
) => {
  return axiosInstance
    .put(`${briefEntriesEndpoint}/${briefEntriesId}`, briefEntriesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Entry has been updated",
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

export const deleteBriefEntriesRequest = (briefEntriesId: string) => {
  return axiosInstance
    .delete(`${briefEntriesEndpoint}/${briefEntriesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Entry has been removed",
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

export const getBriefEntriesByIdRequest = (briefEntriesId: string) => {
  return axiosInstance
    .get(`${briefEntriesEndpoint}/${briefEntriesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsEntries {
  id: string;
  brief_id: string;
  title: string;
  description: string;
  activity_code_id: string;
  start_time: string;
  end_time: string;
  brief: IBriefs;
  activity: IBriefsActivity;
  brief_phase_id: string;
  date: string;
  phase: string;
}
