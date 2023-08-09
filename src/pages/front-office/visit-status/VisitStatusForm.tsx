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

import { ErrorMessagBox, ErrorMessageBox } from "../../../utils/utils";

import { Calendar } from "primereact/calendar";
import {
  IVisitStatus,
  getVisitStatusByIdRequest,
  updateVisitStatusRequest,
  addNewVisitStatusRequest,
} from "./visitStatusApiRequest";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  status: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("status  is Required"),
  description: Yup.string().min(2, "Too Short!").max(200, "Too Long!"),
});

export const VisitStatusForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visitStatusDetails, setVisitEntryDetails] = useState<IVisitStatus>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.visitStatusId) {
      const visitStatusId = urlParams.visitStatusId;
      getVisitStatusByIdRequest(visitStatusId).then((response) => {
        setVisitEntryDetails(response);
      });
    }
  }, [urlParams.visitStatusId]);

  const formikForm = useFormik({
    initialValues: {
      ...visitStatusDetails,
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

      if (urlParams.visitStatusId) {
        updateVisitStatusRequest(filteredObject, urlParams.visitStatusId);
      } else {
        addNewVisitStatusRequest(filteredObject).then((res) => {
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
        {urlParams.visitStatusId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Visit Status
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Visit Status
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
        <div className="w-full p-4 flex flex-col ">
          {/* status */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="status"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Status
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="status"
                placeholder="Enter status name"
                value={formikForm.values.status}
                onChange={(e) => {
                  formikForm.setFieldValue("status", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("status") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("status")}
          </div>

          {/* description */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Description
            </label>
            <div className="flex flex-col">
              <InputTextarea
                rows={3}
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
