import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";

const documentsEndpoint = "matters/documents";

export const fetchMatterDocumentsRequest = () => {
  return axiosInstance
    .get(documentsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewMatterDocumentsRequest = (documentsData: any) => {
  return axiosInstance
    .post(documentsEndpoint, documentsData)
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Document added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(function () {
          window.location.assign("/matters/documents");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMatterDocumentsRequest = (
  documentsData: any,
  documentsId: string
) => {
  return axiosInstance
    .put(`${documentsEndpoint}/${documentsId}`, documentsData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Document has been updated",
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

export const deleteMatterDocumentsRequest = (documentsId: string) => {
  return axiosInstance
    .delete(`${documentsEndpoint}/${documentsId}`)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Document has been removed",
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

export const getMatterDocumentsByIdRequest = (documentsId: string) => {
  return axiosInstance
    .get(`${documentsEndpoint}/${documentsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IMattersDocuments {
  id: string;
  title: string;
  description: string;
  document_url: string;
  folder_name: string;
  date_created: string;
  date_modified: string;
}
