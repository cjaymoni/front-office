import Swal from "sweetalert2";
import { axiosInstance } from "../../../utils/api-util";

const officeAreasEndpoint = "frontoffice/visits/office_areas";

export const fetchOfficeAreasRequest = () => {
  return axiosInstance
    .get(officeAreasEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewOfficeAreasRequest = (officeAreasData: any) => {
  return axiosInstance
    .post(officeAreasEndpoint, officeAreasData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Office Area added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/front-office/office-areas");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateOfficeAreasRequest = (
  officeAreasData: any,
  officeAreasId: string
) => {
  return axiosInstance
    .put(`${officeAreasEndpoint}/${officeAreasId}`, officeAreasData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Office Area  has been updated",
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

export const deleteOfficeAreasRequest = (officeAreasId: string) => {
  return axiosInstance
    .delete(`${officeAreasEndpoint}/${officeAreasId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Office Area  has been removed",
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

export const getOfficeAreasByIdRequest = (officeAreasId: string) => {
  return axiosInstance
    .get(`${officeAreasEndpoint}/${officeAreasId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IOfficeAreas {
  name: string;
  description?: string;

  id?: string;
}
