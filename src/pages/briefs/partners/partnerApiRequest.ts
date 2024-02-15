import { IStaff } from "../../staff/staffApiRequests";
import { IBriefs } from "../brief/briefApiRequest";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const partnerEndpoint = "brief-actions";

export const fetchPartnerRequest = () => {
  return axiosInstance
    .get(partnerEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewPartnerRequest = (partnerData: any) => {
  return axiosInstance
    .post(partnerEndpoint, partnerData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Partner added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/brief-actions/brief");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updatePartnerRequest = (partnerData: any, partnerId: string) => {
  return axiosInstance
    .put(`${partnerEndpoint}/${partnerId}`, partnerData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Partner has been updated",
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

export const deletePartnerRequest = (partnerId: string) => {
  return axiosInstance
    .delete(`${partnerEndpoint}/${partnerId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Partner has been removed",
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

export const getPartnerByIdRequest = (partnerId: string) => {
  return axiosInstance
    .get(`${partnerEndpoint}/${partnerId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IPartner {
  name: string;
  partner_initials: string;
  authors_initials: string;
  phone_number: string;
}
