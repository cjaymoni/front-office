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

import { InputTextarea } from "primereact/inputtextarea";

import { InputNumber } from "primereact/inputnumber";

import { Dropdown } from "primereact/dropdown";
import {
  IReviewPeriod,
  fetchReviewPeriodsRequest,
} from "../review-period/reviewPeriodApiRequest";
import {
  IDepartmentTarget,
  addNewDepartmentTargetsRequest,
  fetchDepartmentTargetsRequest,
  getDepartmentTargetsByIdRequest,
  updateDepartmentTargetsRequest,
} from "../department-target/departmentTargetApiRequest";
import { fetchDepartmentsRequest } from "../../departments/departmentsApiRequests";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import {
  IFirmTarget,
  fetchFirmTargetsRequest,
} from "../firm-target/firmTargetApiRequest";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  review_period_id: Yup.mixed().required("Review period required"),
  title: Yup.string().min(4).max(500).required("Target title is required"),
  // maximum_rating: Yup.number(),
  // minimum_rating: Yup.number(),
  success_indicator: Yup.string(),
  description: Yup.string(),
  start_date: Yup.string(),
  end_date: Yup.string(),
  firm_target_id: Yup.mixed().required("Firm Target required"),
});

export const DepartmentTargetForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [staffTargetDetails, setDepartmentTargetDetails] =
    useState<IDepartmentTarget>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();
  const [firmTargets, setFirmTargets] = useState([]);
  const [reviewPeriods, setReviewPeriods] = useState([]);
  const [filteredReviewPeriods, setFilteredReviewPeriods] = useState(null);
  const [filteredFirmTargets, setFilteredFirmTargets] = useState(null);

  useEffect(() => {
    fetchFirmTargetsRequest().then((response) => {
      setFirmTargets(response);
    });
    fetchReviewPeriodsRequest().then((response) => {
      setReviewPeriods(response);
    });
  }, []);

  useEffect(() => {
    if (urlParams.departmentTargetId) {
      const departmentTargetId = urlParams.departmentTargetId;
      getDepartmentTargetsByIdRequest(departmentTargetId).then((response) => {
        setDepartmentTargetDetails(response);
      });

      //   setDepartmentTargetDetails(props.staffTargetDetails);
    }
  }, [urlParams.departmentTargetId]);

  const reviewPeriodTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const searchReviewPeriod = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredReviewPeriod;

      if (!event.query.trim().length) {
        _filteredReviewPeriod = [...reviewPeriods];
      } else {
        _filteredReviewPeriod = reviewPeriods.filter(
          (country: IReviewPeriod) => {
            return country.title
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredReviewPeriods(_filteredReviewPeriod);
    }, 250);
  };

  const searchFirmTarget = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredFirmTarget;

      if (!event.query.trim().length) {
        _filteredFirmTarget = [...firmTargets];
      } else {
        _filteredFirmTarget = firmTargets.filter((country: IFirmTarget) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredFirmTargets(_filteredFirmTarget);
    }, 250);
  };

  const formikForm = useFormik({
    initialValues: {
      ...staffTargetDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
        staff_id: values.staff_id?.id,
        supervisor_id: values.supervisor_id?.id,
        department_target_id: values.department_target_id?.id,
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.departmentTargetId) {
        updateDepartmentTargetsRequest(
          filteredObject,
          urlParams.departmentTargetId
        );
      } else {
        addNewDepartmentTargetsRequest(filteredObject).then((res) => {
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
        {urlParams.departmentTargetId ? (
          <h1 className="my-4 ml-4 text-2xl text-black">
            Edit Department Target
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-2xl text-black">
            New Department Target
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
              Target title
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="title"
                placeholder="Enter target title"
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

          {/* review_period_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="review_period_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Review Period
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.review_period_id}
                onChange={(e) => {
                  formikForm.setFieldValue("review_period_id", e.target.value);
                }}
                suggestions={filteredReviewPeriods}
                field="title"
                completeMethod={searchReviewPeriod}
                itemTemplate={reviewPeriodTemplate}
                dropdown
                placeholder="Select a review period"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("review_period_id") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("review_period_id")}
          </div>

          {/* firm_target_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="firm_target_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Firm Target
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.firm_target_id}
                onChange={(e) => {
                  formikForm.setFieldValue("firm_target_id", e.target.value);
                }}
                suggestions={filteredFirmTargets}
                field="title"
                completeMethod={searchFirmTarget}
                itemTemplate={reviewPeriodTemplate}
                dropdown
                placeholder="Select a firm target"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("firm_target_id") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("firm_target_id")}
          </div>

          {/* minimum_rating */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="minimum_rating"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Minimum Rating
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="minimum_rating"
                name="minimum_rating"
                value={formikForm.values.minimum_rating}
                onValueChange={(e) =>
                  formikForm.setFieldValue("minimum_rating", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={1}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("minimum_rating") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("minimum_rating")}
          </div>

          {/* maximum_rating */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="maximum_rating"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Maximum Rating
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="maximum_rating"
                name="maximum_rating"
                value={formikForm.values.maximum_rating}
                onValueChange={(e) =>
                  formikForm.setFieldValue("maximum_rating", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={1}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("maximum_rating") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("maximum_rating")}
          </div>

          {/* start_date*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="start_date"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Start Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="start_date"
                name="start_date"
                value={formikForm.values.start_date}
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

          {/* end_date*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="end_date"
              className="font-medium text-left mb-3 text-gray-500"
            >
              End Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="end_date"
                name="end_date"
                value={formikForm.values.end_date}
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

          {/* description */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Description
            </label>
            <div className="flex flex-col">
              <InputTextarea
                rows={5}
                name="description"
                placeholder="Enter target description"
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

          {/* success_indicator*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="success_indicator"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Success Indicator
            </label>
            <div className="flex flex-col">
              <InputTextarea
                rows={5}
                name="success_indicator"
                placeholder="Enter success indicator"
                value={formikForm.values.success_indicator}
                onChange={(e) => {
                  formikForm.setFieldValue("success_indicator", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("success_indicator") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("success_indicator")}
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
