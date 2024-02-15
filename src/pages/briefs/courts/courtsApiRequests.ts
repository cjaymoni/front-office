import { ICases } from "../cases/casesApiRequest";
import { IDistricts } from "../districts/districtsApiRequest";
import { IBriefs } from "../brief/briefApiRequest";

import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const courtsEndpoint = "courts";

export const fetchCourtsRequest = () => {
  return axiosInstance
    .get(courtsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewCourtsRequest = (courtsData: any) => {
  return axiosInstance
    .post(courtsEndpoint, courtsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Court added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/courts");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateCourtsRequest = (courtsData: any, courtsId: string) => {
  return axiosInstance
    .put(`${courtsEndpoint}/${courtsId}`, courtsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Court has been updated",
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

export const deleteCourtsRequest = (courtsId: string) => {
  return axiosInstance
    .delete(`${courtsEndpoint}/${courtsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Court has been removed",
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

export const getCourtsByIdRequest = (courtsId: string) => {
  return axiosInstance
    .get(`${courtsEndpoint}/${courtsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface ICourts {
  id: string;
  name: string;
  location: string;
  district_id: string;
  email: string;
  phone: string;
  district: IDistricts;
  briefs: IBriefs[];
  cases: ICases[];
}
