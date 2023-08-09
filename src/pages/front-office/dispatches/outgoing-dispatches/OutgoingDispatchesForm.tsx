/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";

import { ErrorMessagBox, ErrorMessageBox } from "../../../../utils/utils";
import {
  IOutgoingDispatch,
  addNewOutgoingDispatchRequest,
  getOutgoingDispatchByIdRequest,
  updateOutgoingDispatchRequest,
} from "./outgoingDispatchesApiRequests";
import { Calendar } from "primereact/calendar";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  document_name: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Document title is Required"),
  document_title: Yup.string().min(2, "Too Short!").max(200, "Too Long!"),
  reference_number: Yup.string()
    .min(2, "Too Short!")
    .required("Reference number is required"),
  serial_no: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Serial number is Required"),
  date: Yup.date().required("date is required"),
});

export const OutgoingDispatchForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [outgoingDispatchDetails, setOutgoingDispatchDetails] =
    useState<IOutgoingDispatch>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.outgoingDispatchId) {
      const outgoingDispatchId = urlParams.outgoingDispatchId;
      getOutgoingDispatchByIdRequest(outgoingDispatchId).then((response) => {
        setOutgoingDispatchDetails(response);
      });

      //   setOutgoingDispatchDetails(props.outgoingDispatchDetails);
    }
  }, [urlParams.outgoingDispatchId]);

  const formikForm = useFormik({
    initialValues: {
      ...outgoingDispatchDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
        date: (values.date / 1000).toString(),
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.outgoingDispatchId) {
        updateOutgoingDispatchRequest(
          filteredObject,
          urlParams.outgoingDispatchId
        );
      } else {
        addNewOutgoingDispatchRequest(filteredObject).then((res) => {
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
        {urlParams.outgoingDispatchId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Outgoing Dispatch
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Outgoing Dispatch
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
          {/* document_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="document_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Document name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="document_name"
                placeholder="Enter document document_name"
                value={formikForm.values.document_name}
                onChange={(e) => {
                  formikForm.setFieldValue("document_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("document_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("document_name")}
          </div>

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
                placeholder="Enter document title"
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

          {/* reference_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="reference_number"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Reference number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="reference_number"
                placeholder="Enter reference number"
                value={formikForm.values.reference_number}
                onChange={(e) => {
                  formikForm.setFieldValue("reference_number", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("reference_number") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("reference_number")}
          </div>

          {/* serial_no */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="serial_no"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Serial Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="serial_no"
                placeholder="Enter  serial number"
                value={formikForm.values.serial_no}
                onChange={(e) => {
                  formikForm.setFieldValue("serial_no", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("serial_no") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("serial_no")}
          </div>
          {/* date  */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="date"
                name="date"
                value={
                  formikForm.values.date
                    ? new Date(formikForm.values.date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("date")}
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
