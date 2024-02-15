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
  IBriefsDocuments,
  addNewBriefDocumentsRequest,
  getBriefDocumentsByIdRequest,
  updateBriefDocumentsRequest,
} from "./briefsDocumentsApiRequest";
import { Calendar } from "primereact/calendar";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Editor } from "primereact/editor";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
});

export const BriefsDocumentForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [briefsDocumentDetails, setBriefsDocumentDetails] =
    useState<IBriefsDocuments>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.briefsDocumentId) {
      const briefsDocumentId = urlParams.briefsDocumentId;
      getBriefDocumentsByIdRequest(briefsDocumentId).then((response) => {
        setBriefsDocumentDetails(response);
      });
    }
  }, [urlParams.briefsDocumentId]);

  const formikForm = useFormik({
    initialValues: {
      ...briefsDocumentDetails,
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

      if (urlParams.briefsDocumentId) {
        updateBriefDocumentsRequest(filteredObject, urlParams.briefsDocumentId);
      } else {
        addNewBriefDocumentsRequest(filteredObject).then((res) => {
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
        {urlParams.briefsDocumentId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Briefs Document
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Briefs Document
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

          {/* document_url */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="document_url"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Choose Document
            </label>
            <div className="flex flex-col">
              <InputText
                type="file"
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

          {/* description */}
          <div className="flex flex-col mb-4">
            <Accordion activeIndex={0} className="w-full ">
              <AccordionTab header="Description">
                <Editor
                  placeholder={"Enter Description .."}
                  value={formikForm.values.description}
                  onTextChange={(e) =>
                    formikForm.setFieldValue("description", e.htmlValue)
                  }
                  style={{ height: "320px" }}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                    clipboard: {
                      // toggle to add extra line breaks when pasting HTML:
                      matchVisual: false,
                    },
                  }}
                />
              </AccordionTab>
            </Accordion>

            {getFormErrorMessage("description")}
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
