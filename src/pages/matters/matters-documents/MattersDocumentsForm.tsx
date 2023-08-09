/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik, Field } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { ErrorMessagBox, ErrorMessageBox } from "../../../utils/utils";

import { InputTextarea } from "primereact/inputtextarea";
import {
  IMattersDocuments,
  addNewMatterDocumentsRequest,
  getMatterDocumentsByIdRequest,
  updateMatterDocumentsRequest,
} from "./mattersDocumentsApiRequest";
import { Calendar } from "primereact/calendar";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
});

export const MattersDocumentForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mattersDocumentDetails, setMattersDocumentDetails] =
    useState<IMattersDocuments>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.mattersDocumentId) {
      const mattersDocumentId = urlParams.mattersDocumentId;
      getMatterDocumentsByIdRequest(mattersDocumentId).then((response) => {
        setMattersDocumentDetails(response);
      });
    }
  }, [urlParams.mattersDocumentId]);

  const formikForm = useFormik({
    initialValues: {
      ...mattersDocumentDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.mattersDocumentId) {
        updateMatterDocumentsRequest(
          filteredObject,
          urlParams.mattersDocumentId
        );
      } else {
        addNewMatterDocumentsRequest(filteredObject).then((res) => {
          if (res.response.status === 422) {
            setServerErrors({ ...res.response.data });

            scrollToElement(targetRef);
          }
        });
      }
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formikForm.touched[name] && formikForm.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      // eslint-disable-next-line
      <small className="p-error text-left">
        {formikForm.errors[name] as any}
      </small>
    ) : (
      <small className="p-error text-left">&nbsp;</small>
    );
  };

  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.mattersDocumentId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Matters Document
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Matters Document
          </h1>
        )}
      </div>
      {isSubmitted && Object.keys(formikForm.errors).length > 0 && (
        <div>
          <ErrorMessagBox errors={formikForm.errors} />
        </div>
      )}
      {isSubmitted && serverErrors && Object.keys(serverErrors).length > 0 && (
        <div>
          <ErrorMessageBox errors={serverErrors} />
        </div>
      )}
      <form
        id="staffRoom"
        onSubmit={formikForm.handleSubmit}
        className="w-full"
      >
        <div className="w-full p-4 grid grid-cols-2 gap-6">
          {/*  title */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Title
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="title"
                placeholder="Enter document title"
                value={formikForm.values.title}
                onChange={(e) => {
                  formikForm.setFieldValue("title", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("title") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("title")}
          </div>
          {/* description */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Description
            </label>
            <div className="flex flex-col">
              <InputTextarea
                name="description"
                placeholder="Enter description"
                value={formikForm.values.description}
                onChange={(e) => {
                  formikForm.setFieldValue("description", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("description") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("description")}
          </div>

          {/* document_url */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="document_url"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Document url
            </label>
            <div className="flex flex-col">
              <InputText
                type="document_url"
                name="document_url"
                placeholder="Enter  document_url"
                value={formikForm.values.document_url}
                onChange={(e) => {
                  formikForm.setFieldValue("document_url", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("document_url") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("document_url")}
          </div>
          {/* folder_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="folder_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Folder Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="folder_name"
                name="folder_name"
                placeholder="Enter  folder name"
                value={formikForm.values.folder_name}
                onChange={(e) => {
                  formikForm.setFieldValue("folder_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("folder_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("folder_name")}
          </div>
        </div>

        {/* buttons */}
        <div className="flex  justify-end">
          <Button
            type="submit"
            label="Save"
            icon="pi pi-save"
            className={style({
              marginRight: "1rem",
            })}
            onClick={() => {
              scrollToElement(targetRef);

              setIsSubmitted(true);
            }}
          />
          <Button
            label="Go back"
            icon="pi pi-arrow-left"
            type="button"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
};
