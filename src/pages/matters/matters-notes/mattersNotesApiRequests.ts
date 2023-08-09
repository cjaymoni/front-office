import { IMatters } from "../matter/matterApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const matterNotesEndpoint = "matter-notes";

export const fetchMatterNotesRequest = () => {
  return axiosInstance
    .get(matterNotesEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterNotesRequest = (matterNotesData: any) => {
  return axiosInstance
    .post(matterNotesEndpoint, matterNotesData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Matter Note added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matter-notes/matter");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterNotesRequest = (
  matterNotesData: any,
  matterNotesId: string
) => {
  return axiosInstance
    .put(`${matterNotesEndpoint}/${matterNotesId}`, matterNotesData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Note has been updated",
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

export const deleteMatterNotesRequest = (matterNotesId: string) => {
  return axiosInstance
    .delete(`${matterNotesEndpoint}/${matterNotesId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Matter Note has been removed",
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

export const getMatterNotesByIdRequest = (matterNotesId: string) => {
  return axiosInstance
    .get(`${matterNotesEndpoint}/${matterNotesId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersNotes {
  id: string;
  matter_id: string;
  title: string;
  body: string;
  date: string;
  authour: string;
  matter: IMatters;
}
