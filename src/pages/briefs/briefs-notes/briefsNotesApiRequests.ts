import { IBriefs } from "../brief/briefApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const briefNotesEndpoint = "brief-notes";

export const fetchBriefNotesRequest = () => {
  return axiosInstance
    .get(briefNotesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefNotesRequest = (briefNotesData: any) => {
  return axiosInstance
    .post(briefNotesEndpoint, briefNotesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Brief Note added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-notes/brief");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefNotesRequest = (
  briefNotesData: any,
  briefNotesId: string
) => {
  return axiosInstance
    .put(`${briefNotesEndpoint}/${briefNotesId}`, briefNotesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Note has been updated",
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

export const deleteBriefNotesRequest = (briefNotesId: string) => {
  return axiosInstance
    .delete(`${briefNotesEndpoint}/${briefNotesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Brief Note has been removed",
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

export const getBriefNotesByIdRequest = (briefNotesId: string) => {
  return axiosInstance
    .get(`${briefNotesEndpoint}/${briefNotesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsNotes {
  id: string;
  brief_id: string;
  staff_id: string;
  title: string;
  body: string;
  date: string;
  staff: string;
  brief: IBriefs;
}
