import { axiosInstance } from "../../../utils/api-util";
import Swal from "sweetalert2";
import { IBriefLitigation } from "../briefs-litigation/briefsLitigationApiRequests";

const documentsEndpoint = "briefs/documents";

export const fetchBriefDocumentsRequest = () => {
  return axiosInstance
    .get(documentsEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addNewBriefDocumentsRequest = (documentsData: any) => {
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
          window.location.assign("/briefs/documents");
        });
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBriefDocumentsRequest = (
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

export const deleteBriefDocumentsRequest = (documentsId: string) => {
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

export const getBriefDocumentsByIdRequest = (documentsId: string) => {
  return axiosInstance
    .get(`${documentsEndpoint}/${documentsId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export interface IBriefsDocuments {
  id: string;
  title: string;
  description: string;
  document_url: string;
  folder_name: string;
  date_created: string;
  date_modified: string;
  file_path: string;
  litigation_id: string;
  litigation: IBriefLitigation;
}
