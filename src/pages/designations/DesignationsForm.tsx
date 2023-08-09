/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";

import { ErrorMessagBox, ErrorMessageBox } from "../../utils/utils";

import { InputTextarea } from "primereact/inputtextarea";
import {
  IDesignation,
  addNewDesignationsRequest,
  getDesignationsByIdRequest,
  updateDesignationsRequest,
} from "./designationsApiRequests";
import { InputNumber } from "primereact/inputnumber";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Designation title is Required"),
  min_salary: Yup.number().required("Minimum salary is required"),
  maximum_salary: Yup.number().required("Maximum salary is required"),
  rate_per_case: Yup.number().required("Rate per case is required"),
  rate_per_hour: Yup.number().required("Rate per hour is required"),
  commission_per_case: Yup.number().required("Commission per case is required"),
});

export const DesignationsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [designationDetails, setDesignationDetails] = useState<IDesignation>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.designationId) {
      const designationId = urlParams.designationId;
      getDesignationsByIdRequest(designationId).then((response) => {
        setDesignationDetails(response);
      });

      //   setDesignationDetails(props.designationDetails);
    }
  }, [urlParams.designationId]);

  const formikForm = useFormik({
    initialValues: {
      ...designationDetails,
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

      if (urlParams.designationId) {
        updateDesignationsRequest(filteredObject, urlParams.designationId);
      } else {
        addNewDesignationsRequest(filteredObject).then((res) => {
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
        {urlParams.designationId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Designation
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Designation
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
          {/* title */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Designation Title
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="title"
                placeholder="Enter designation title"
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

          {/* min_salary */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="min_salary"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Minimum Salary
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="min_salary"
                name="min_salary"
                value={formikForm.values.min_salary}
                onValueChange={(e) =>
                  formikForm.setFieldValue("min_salary", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("min_salary") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("min_salary")}
          </div>

          {/* maximum_salary */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="maximum_salary"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Maximum Salary
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="maximum_salary"
                name="maximum_salary"
                value={formikForm.values.maximum_salary}
                onValueChange={(e) =>
                  formikForm.setFieldValue("maximum_salary", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("maximum_salary") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("maximum_salary")}
          </div>

          {/* rate_per_case */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="rate_per_case"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Rate per case
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="rate_per_case"
                name="rate_per_case"
                value={formikForm.values.rate_per_case}
                onValueChange={(e) =>
                  formikForm.setFieldValue("rate_per_case", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("rate_per_case") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("rate_per_case")}
          </div>

          {/* rate_per_hour */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="rate_per_hour"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Rate per hour
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="rate_per_hour"
                name="rate_per_hour"
                value={formikForm.values.rate_per_hour}
                onValueChange={(e) =>
                  formikForm.setFieldValue("rate_per_hour", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("rate_per_hour") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("rate_per_hour")}
          </div>

          {/* commission_per_case */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="commission_per_case"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Commission per case
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="commission_per_case"
                name="commission_per_case"
                value={formikForm.values.commission_per_case}
                onValueChange={(e) =>
                  formikForm.setFieldValue("commission_per_case", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("commission_per_case") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("commission_per_case")}
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
