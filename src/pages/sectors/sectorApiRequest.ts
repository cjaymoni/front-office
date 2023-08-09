import { axiosInstance } from "../../utils/api-util";
import Swal from "sweetalert2";

const sectorsEndpoint = "hr/sectors";

export const fetchSectorsRequest = () => {
  return axiosInstance
    .get(sectorsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewSectorsRequest = (sectorData: any) => {
  return axiosInstance
    .post(sectorsEndpoint, sectorData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Sector added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/sectors");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateSectorsRequest = (sectorData: any, sectorId: string) => {
  return axiosInstance
    .put(`${sectorsEndpoint}/${sectorId}`, sectorData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Sector has been updated",
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

export const deleteSectorsRequest = (sectorId: string) => {
  return axiosInstance
    .delete(`${sectorsEndpoint}/${sectorId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Sector has been removed",
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

export const getSectorsByIdRequest = (sectorId: string) => {
  return axiosInstance
    .get(`${sectorsEndpoint}/${sectorId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface ISector {
  id?: string;
  title: string;
  description?: string;
}
