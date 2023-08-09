import Swal from "sweetalert2";
import { axiosInstance } from "../../../utils/api-util";
import { IStaff } from "../../staff/staffApiRequests";

const visitEntryEndpoint = "frontoffice/visits/visit_entries";

export const fetchVisitEntryRequest = () => {
  return axiosInstance
    .get(visitEntryEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewVisitEntryRequest = (visitEntryData: any) => {
  return axiosInstance
    .post(visitEntryEndpoint, visitEntryData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Visit Entry added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/front-office/visit-entry");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateVisitEntryRequest = (
  visitEntryData: any,
  visitEntryId: string
) => {
  return axiosInstance
    .put(`${visitEntryEndpoint}/${visitEntryId}`, visitEntryData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Visit Entry has been updated",
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

export const deleteVisitEntryRequest = (visitEntryId: string) => {
  return axiosInstance
    .delete(`${visitEntryEndpoint}/${visitEntryId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Visit Entry has been removed",
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

export const getVisitEntryByIdRequest = (visitEntryId: string) => {
  return axiosInstance
    .get(`${visitEntryEndpoint}/${visitEntryId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IVisitEntry {
  visitor_name: string;
  visitor_email: string;
  visitor_phone: string;
  visit_purpose: string;
  visit_date: string;
  person_to_see_id: string;
  visit_category_id: string;
  office_area_id: string;
  visit_status_id: string;
  id?: string;
  person_to_see?: IStaff;
}
