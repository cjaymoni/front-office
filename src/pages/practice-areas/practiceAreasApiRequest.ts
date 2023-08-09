import { axiosInstance } from "../../utils/api-util";
import Swal from "sweetalert2";

const practiceAreaEndpoint = "hr/practice_areas";

export const fetchPracticeAreasRequest = () => {
  return axiosInstance
    .get(practiceAreaEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewPracticeAreasRequest = (practiceAreasData: any) => {
  return axiosInstance
    .post(practiceAreaEndpoint, practiceAreasData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Practice Area added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/practice-areas");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updatePracticeAreasRequest = (
  practiceAreasData: any,
  practiceAreasId: string
) => {
  return axiosInstance
    .put(`${practiceAreaEndpoint}/${practiceAreasId}`, practiceAreasData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Practice Area has been updated",
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

export const deletePracticeAreasRequest = (practiceAreasId: string) => {
  return axiosInstance
    .delete(`${practiceAreaEndpoint}/${practiceAreasId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Practice Area has been removed",
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

export const getPracticeAreasByIdRequest = (practiceAreasId: string) => {
  return axiosInstance
    .get(`${practiceAreaEndpoint}/${practiceAreasId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IPracticeArea {
  id?: string;
  title: string;
  description?: string;
}
