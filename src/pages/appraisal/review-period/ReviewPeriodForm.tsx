/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";

import { ErrorMessagBox, ErrorMessageBox } from "../../../utils/utils";
import {
  IReviewPeriod,
  addNewReviewPeriodsRequest,
  getReviewPeriodsByIdRequest,
  updateReviewPeriodsRequest,
} from "./reviewPeriodApiRequest";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Review Period title is Required"),
  description: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
});

export const ReviewPeriodForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [departmentDetails, setReviewPeriodDetails] = useState<IReviewPeriod>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.departmentId) {
      const departmentId = urlParams.departmentId;
      getReviewPeriodsByIdRequest(departmentId).then((response) => {
        setReviewPeriodDetails(response);
      });

      //   setReviewPeriodDetails(props.departmentDetails);
    }
  }, [urlParams.departmentId]);

  const formikForm = useFormik({
    initialValues: {
      ...departmentDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
        year: (values.year / 1000).toString(),
        end_date: (values.end_date / 1000).toString(),
        start_date: (values.start_date / 1000).toString(),
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.departmentId) {
        updateReviewPeriodsRequest(filteredObject, urlParams.departmentId);
      } else {
        addNewReviewPeriodsRequest(filteredObject).then((res) => {
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
        {urlParams.departmentId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Review Period
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Review Period
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
          {/*  name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Period Title
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="title"
                placeholder="Enter period title"
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

          {/*start date*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="start_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Start date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="start_date"
                name="start_date"
                value={
                  formikForm.values.start_date
                    ? new Date(formikForm.values.start_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("start_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("start_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("start_date")}
          </div>

          {/* end date */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="end_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              End Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="end_date"
                name="end_date"
                value={
                  formikForm.values.end_date
                    ? new Date(formikForm.values.end_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("end_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("end_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("end_date")}
          </div>

          {/* year */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="year"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Year
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="year"
                name="year"
                value={
                  formikForm.values.year
                    ? new Date(formikForm.values.year)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("year"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("year", e.target.value);
                }}
                showIcon
                placeholder="yyyy"
                view="year"
                dateFormat="yy"
              />
            </div>
            {getFormErrorMessage("year")}
          </div>

          {/* description */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Description
            </label>
            <div className="flex flex-col">
              <InputTextarea
                rows={5}
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
