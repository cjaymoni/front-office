import { IStaff } from "../../staff/staffApiRequests";
import { IAddress } from "../address/addressApiRequests";
import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const contactsEndpoint = "crm/contacts";

export const fetchContactsRequest = () => {
  return axiosInstance
    .get(contactsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewContactsRequest = (contactsData: any) => {
  return axiosInstance
    .post(contactsEndpoint, contactsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Contact added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/staff-targets");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateContactsRequest = (
  contactsData: any,
  contactsId: string
) => {
  return axiosInstance
    .put(`${contactsEndpoint}/${contactsId}`, contactsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Contact has been updated",
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

export const deleteContactsRequest = (contactsId: string) => {
  return axiosInstance
    .delete(`${contactsEndpoint}/${contactsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Contact has been removed",
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

export const getContactsByIdRequest = (contactsId: string) => {
  return axiosInstance
    .get(`${contactsEndpoint}/${contactsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export interface IContact {
  salutation: string;
  title: string;
  description: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  personal_email: string;
  primary_official_email: string;
  secondary_official_email: string;
  primary_mobile_number: string;
  secondary_mobile_number: string;
  home_phone_number: string;
  primary_office_phone_number: string;
  secondary_office_phone_number: string;
  department: string;
  language: string;
  do_not_call: string;
  website_url: string;
  linked_in_url: string;
  facebook_url: string;
  twitter_username: string;
  country: string;
  is_active: boolean;
  creator_id: string;
  address_ids: string[];
  staff_ids: string[];
  lead_ids: string[];
  id: string;
  created_by: IStaff;
  updated_by: IStaff;
  addresses: IAddress[];
  staffs: IStaff[];
}
