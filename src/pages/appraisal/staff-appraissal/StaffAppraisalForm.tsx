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
import {
  IStaffAppraisal,
  addNewStaffAppraisalRequest,
  getStaffAppraisalByIdRequest,
  updateStaffAppraisalRequest,
} from "./staffAppraisalApiRequests";
import { Dropdown } from "primereact/dropdown";
import {
  IReviewPeriod,
  fetchReviewPeriodsRequest,
} from "../review-period/reviewPeriodApiRequest";
import {
  IDepartmentTarget,
  fetchDepartmentTargetsRequest,
} from "../department-target/departmentTargetApiRequest";
import {
  IStaffTarget,
  fetchStaffTargetsRequest,
} from "../staff-target/staffTargetApiRequest";
import { AutoComplete } from "primereact/autocomplete";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  evaluator_remarks: Yup.string().min(20, "Too Short!"),
  staff_remarks: Yup.string().min(20, "Too short"),
  //   maximum_salary: Yup.number().required("Maximum salary is required"),
  //   rate_per_case: Yup.number().required("Rate per case is required"),
  //   rate_per_hour: Yup.number().required("Rate per hour is required"),
  //   commission_per_case: Yup.number().required("Commission per case is required"),
});

export const StaffAppraisalForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [staffAppraisalDetails, setStaffAppraisalDetails] =
    useState<IStaffAppraisal>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();
  const [staffTargets, setStaffTargets] = useState([]);
  const [reviewPeriods, setReviewPeriods] = useState([]);
  const [departmentTargets, setDepartmentTargets] = useState([]);
  const [filteredStaffTargets, setFilteredStaffTargets] = useState(null);
  const [filteredDepartmentTargets, setFilteredDepartmentTargets] =
    useState(null);
  const [filteredReviewPeriods, setFilteredReviewPeriods] = useState(null);

  useEffect(() => {
    fetchReviewPeriodsRequest().then((response) => {
      setReviewPeriods(response);
    });
    fetchDepartmentTargetsRequest().then((response) => {
      setDepartmentTargets(response);
    });
    fetchStaffTargetsRequest().then((response) => {
      setStaffTargets(response);
    });
  }, []);

  useEffect(() => {
    if (urlParams.staffAppraisalId) {
      const staffAppraisalId = urlParams.staffAppraisalId;
      getStaffAppraisalByIdRequest(staffAppraisalId).then((response) => {
        setStaffAppraisalDetails(response);
      });

      //   setStaffAppraisalDetails(props.staffAppraisalDetails);
    }
  }, [urlParams.staffAppraisalId]);

  const searchStaffTarget = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredStaffTarget;

      if (!event.query.trim().length) {
        _filteredStaffTarget = [...staffTargets];
      } else {
        _filteredStaffTarget = staffTargets.filter((country: IStaffTarget) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredStaffTargets(_filteredStaffTarget);
    }, 250);
  };

  const searchDepartmentTarget = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredDepartmentTarget;

      if (!event.query.trim().length) {
        _filteredDepartmentTarget = [...departmentTargets];
      } else {
        _filteredDepartmentTarget = departmentTargets.filter(
          (country: IDepartmentTarget) => {
            return country.title
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredDepartmentTargets(_filteredDepartmentTarget);
    }, 250);
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
  const staffTargetTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const formikForm = useFormik({
    initialValues: {
      ...staffAppraisalDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
        staff_target_id: values.staff_target_id?.id,
        review_period_id: values.review_period_id?.id,
        department_target_id: values.department_target_id?.id,
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.staffAppraisalId) {
        updateStaffAppraisalRequest(filteredObject, urlParams.staffAppraisalId);
      } else {
        addNewStaffAppraisalRequest(filteredObject).then((res) => {
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
        {urlParams.staffAppraisalId ? (
          <h1 className="my-4 ml-4 text-2xl text-black">
            Edit Staff Appraisal
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-2xl text-black">New Staff Appraisal</h1>
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
          {/* staff_Target_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Staff Target
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.staff_target_id}
                onChange={(e) => {
                  formikForm.setFieldValue("staff_target_id", e.target.value);
                }}
                suggestions={filteredStaffTargets}
                field="title"
                completeMethod={searchStaffTarget}
                itemTemplate={staffTargetTemplate}
                dropdown
                placeholder="Select a staff target"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("staff_target_id") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("staff_target_id")}
          </div>

          {/* department_target */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Department Target
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.department_target}
                onChange={(e) => {
                  formikForm.setFieldValue("department_target", e.target.value);
                }}
                suggestions={filteredDepartmentTargets}
                completeMethod={searchDepartmentTarget}
                field="title"
                itemTemplate={staffTargetTemplate}
                dropdown
                placeholder="Select a department target"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("department_target") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("department_target")}
          </div>

          {/* review_period */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="review_period_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Review period
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.review_period_id}
                onChange={(e) => {
                  formikForm.setFieldValue("review_period_id", e.target.value);
                }}
                suggestions={filteredReviewPeriods}
                completeMethod={searchReviewPeriod}
                field="title"
                itemTemplate={staffTargetTemplate}
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

          {/* quality_score */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="quality_score"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Quality score
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="quality_score"
                name="quality_score"
                value={formikForm.values.quality_score}
                onValueChange={(e) =>
                  formikForm.setFieldValue("quality_score", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("quality_score") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("quality_score")}
          </div>

          {/* efficiency_score */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="efficiency_score"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Efficiency score
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="efficiency_score"
                name="efficiency_score"
                value={formikForm.values.efficiency_score}
                onValueChange={(e) =>
                  formikForm.setFieldValue("efficiency_score", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("efficiency_score") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("efficiency_score")}
          </div>

          {/* timeliness_score */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="timeliness_score"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Timeliness score
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="timeliness_score"
                name="timeliness_score"
                value={formikForm.values.timeliness_score}
                onValueChange={(e) =>
                  formikForm.setFieldValue("timeliness_score", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("timeliness_score") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("timeliness_score")}
          </div>

          {/* accuracy_score */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="accuracy_score"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Accuracy score
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="accuracy_score"
                name="accuracy_score"
                value={formikForm.values.accuracy_score}
                onValueChange={(e) =>
                  formikForm.setFieldValue("accuracy_score", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("accuracy_score") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("accuracy_score")}
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
