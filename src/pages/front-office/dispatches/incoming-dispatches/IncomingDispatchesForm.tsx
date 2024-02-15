/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";

import { InputTextarea } from "primereact/inputtextarea";

import { InputNumber } from "primereact/inputnumber";
import {
  IDispatchStatus,
  IIncomingDispatch,
  addNewIncomingDispatchRequest,
  getIncomingDispatchByIdRequest,
  updateIncomingDispatchRequest,
} from "./incomingDispatchesApiRequests";
import {
  ErrorMessagBox,
  ErrorMessageBox,
  createOptionsFromEnum,
} from "../../../../utils/utils";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  document_title: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Document title is Required"),
  description: Yup.string().min(2, "Too Short!"),
  client: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("client name is Required"),
  courier_name: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("courier name is Required"),
  courier_phone: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("courier phone is Required"),
  sender_name: Yup.string().min(2, "Too Short!").max(200, "Too Long!"),
  status: Yup.mixed(),
  time: Yup.mixed(),
  remarks: Yup.string(),
});

export const IncomingDispatchForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [incomingDispatchDetails, setIncomingDispatchDetails] =
    useState<IIncomingDispatch>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.incomingDispatchId) {
      const incomingDispatchId = urlParams.incomingDispatchId;
      getIncomingDispatchByIdRequest(incomingDispatchId).then((response) => {
        setIncomingDispatchDetails(response);
      });

      //   setIncomingDispatchDetails(props.incomingDispatchDetails);
    }
  }, [urlParams.incomingDispatchId]);

  const formikForm = useFormik({
    initialValues: {
      ...incomingDispatchDetails,
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

      if (urlParams.incomingDispatchId) {
        updateIncomingDispatchRequest(
          filteredObject,
          urlParams.incomingDispatchId
        );
      } else {
        addNewIncomingDispatchRequest(filteredObject).then((res) => {
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
        {urlParams.incomingDispatchId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Incoming Dispatch
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Incoming Dispatch
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
        id="departmentRoom"
        onSubmit={formikForm.handleSubmit}
        className="w-full"
      >
        <div className="w-full p-4 grid grid-cols-2 gap-4">
          {/* document_title */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="document_title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Document Title
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="document_title"
                placeholder="Enter document document_title"
                value={formikForm.values.document_title}
                onChange={(e) => {
                  formikForm.setFieldValue("document_title", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("document_title") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("document_title")}
          </div>

          {/* client */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="client"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Client name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="client"
                placeholder="Enter client name"
                value={formikForm.values.client}
                onChange={(e) => {
                  formikForm.setFieldValue("client", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("client") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("client")}
          </div>

          {/* description */}
          {/* <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Document Description
            </label>
            <div className="flex flex-col">
              <InputTextarea
                name="description"
                placeholder="Enter document description"
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
          </div> */}

          {/* sender_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="sender_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Sender Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="sender_name"
                placeholder="Enter  sender name"
                value={formikForm.values.sender_name}
                onChange={(e) => {
                  formikForm.setFieldValue("sender_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("sender_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("sender_name")}
          </div>

          {/* courier_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="courier_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Courier name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="courier_name"
                placeholder="Enter courier name"
                value={formikForm.values.courier_name}
                onChange={(e) => {
                  formikForm.setFieldValue("courier_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("courier_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("courier_name")}
          </div>

          {/* courier_phone */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="courier_phone"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Courier phone
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="courier_phone"
                placeholder="Enter document courier_phone"
                value={formikForm.values.courier_phone}
                onChange={(e) => {
                  formikForm.setFieldValue("courier_phone", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("courier_phone") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("courier_phone")}
          </div>

          {/* status */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="status"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Status
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={
                  formikForm.values.status
                    ? new Date(formikForm.values.status)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("status"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("status", e.target.value);
                }}
                options={createOptionsFromEnum(IDispatchStatus)}
                optionLabel="label"
                showClear
                placeholder="Select a status"
              />
            </div>
            {getFormErrorMessage("status")}
          </div>

          {/* description */}
          <div className="flex flex-col mb-4">
            <Accordion activeIndex={0} className="w-full ">
              <AccordionTab header="Document Description">
                <Editor
                  placeholder={"Enter document description .."}
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
          {/* remarks */}
          <div className="flex flex-col mb-4">
            <Accordion activeIndex={0} className="w-full ">
              <AccordionTab header="Remarks">
                <Editor
                  placeholder={"Enter  remarks .."}
                  value={formikForm.values.remarks}
                  onTextChange={(e) =>
                    formikForm.setFieldValue("remarks", e.htmlValue)
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

            {getFormErrorMessage("remarks")}
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
      </form>{" "}
    </div>
  );
};
