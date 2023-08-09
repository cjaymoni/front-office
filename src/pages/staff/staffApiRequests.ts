import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/api-util";
import Swal from "sweetalert2";
import { IDesignation } from "../designations/designationsApiRequests";
import { IDepartment } from "../departments/departmentsApiRequests";
import { IPracticeArea } from "../practice-areas/practiceAreasApiRequest";
import { ISector } from "../sectors/sectorApiRequest";

const staffEndpoint = "hr/staffs";

export const fetchStaffRequest = () => {
  return axiosInstance
    .get(staffEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewStaffRequest = (staffData: any) => {
  return axiosInstance
    .post(staffEndpoint, staffData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Staff added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/staff");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateStaffRequest = (staffData: any, staffId: string) => {
  return axiosInstance
    .put(`${staffEndpoint}/${staffId}`, staffData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Staff has been updated",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // .then(function () {
        //   window.location.reload();
        // });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteStaffRequest = (staffId: string) => {
  return axiosInstance
    .delete(`${staffEndpoint}/${staffId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Staff has been removed",
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

export const getStaffByIdRequest = (staffId: string) => {
  return axiosInstance
    .get(`${staffEndpoint}/${staffId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IStaff {
  id?: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  official_email?: string;
  personal_email: string;
  cellphone_1: string;
  cellphone_2?: string;
  location?: string;

  tin?: string;
  ssn?: string;
  national_id?: string;
  nhis?: string;

  linkedin?: string;

  department_id?: string;
  designation_id?: string;

  overtime_allowed?: boolean;
  leave_days?: number;
  sick_days?: number;

  hire_date?: string;
  registration_number?: string;
  year_called_to_bar?: string;
  end_date?: string;
  salary?: number;
  rate_per_matter?: number;
  commission_per_matter?: number;
  is_active?: boolean;
  practice_area_ids?: string[];
  sector_ids?: string[];
  designation?: IDesignation;
  department?: IDepartment;
  practice_areas?: IPracticeArea[];
  sectors?: ISector[];
}
