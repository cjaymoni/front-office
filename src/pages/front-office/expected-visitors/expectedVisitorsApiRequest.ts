import Swal from "sweetalert2";
import { axiosInstance } from "../../../utils/api-util";
import { IStaff } from "../../staff/staffApiRequests";

const expectedVisitorsEndpoint = "frontoffice/visits/expected_visitors";

export const fetchExpectedVisitorsRequest = () => {
  return axiosInstance
    .get(expectedVisitorsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewExpectedVisitorsRequest = (expectedVisitorsData: any) => {
  return axiosInstance
    .post(expectedVisitorsEndpoint, expectedVisitorsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Expected Visitors added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/expected-visitors");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateExpectedVisitorsRequest = (
  expectedVisitorsData: any,
  expectedVisitorsId: string
) => {
  return axiosInstance
    .put(
      `${expectedVisitorsEndpoint}/${expectedVisitorsId}`,
      expectedVisitorsData
    )
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Expected Visitors has been updated",
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

export const deleteExpectedVisitorsRequest = (expectedVisitorsId: string) => {
  return axiosInstance
    .delete(`${expectedVisitorsEndpoint}/${expectedVisitorsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Expected Visitors has been removed",
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

export const getExpectedVisitorsByIdRequest = (expectedVisitorsId: string) => {
  return axiosInstance
    .get(`${expectedVisitorsEndpoint}/${expectedVisitorsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IExpectedVisitors {
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
  person_to_see: IStaff;
}
