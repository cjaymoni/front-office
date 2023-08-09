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
import { fetchReviewPeriodsRequest } from "../review-period/reviewPeriodApiRequest";
import {
  IDepartmentTarget,
  fetchDepartmentTargetsRequest,
} from "../department-target/departmentTargetApiRequest";
import {
  IStaffTarget,
  addNewStaffTargetsRequest,
  fetchStaffTargetsRequest,
  getStaffTargetsByIdRequest,
  updateStaffTargetsRequest,
} from "../staff-target/staffTargetApiRequest";
import { IStaff, fetchStaffRequest } from "../../staff/staffApiRequests";
import { AutoComplete } from "primereact/autocomplete";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  supervisor_remarks: Yup.string().min(20, "Too Short!"),
  employee_remarks: Yup.string().min(20, "Too short"),
  title: Yup.string().min(4).max(500).required("Target title is required"),
  maximum_rating: Yup.number(),
  minimum_rating: Yup.number(),
  status: Yup.string(),
  description: Yup.string(),
  //   rate_per_case: Yup.number().required("Rate per case is required"),
  //   rate_per_hour: Yup.number().required("Rate per hour is required"),
  //   commission_per_case: Yup.number().required("Commission per case is required"),
});

export const StaffTargetForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [staffTargetDetails, setStaffTargetDetails] = useState<IStaffTarget>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();
  const [staffList, setStaffList] = useState([]);
  const [reviewPeriods, setReviewPeriods] = useState([]);
  const [departmentTargets, setDepartmentTargets] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState(null);
  const [filteredDepartmentTargets, setFilteredDepartmentTargets] =
    useState(null);

  useEffect(() => {
    fetchDepartmentTargetsRequest().then((response) => {
      setDepartmentTargets(response);
    });
    fetchStaffRequest().then((response) => {
      setStaffList(response);
    });
  }, []);

  useEffect(() => {
    if (urlParams.staffTargetId) {
      const staffTargetId = urlParams.staffTargetId;
      getStaffTargetsByIdRequest(staffTargetId).then((response) => {
        setStaffTargetDetails(response);
      });

      //   setStaffTargetDetails(props.staffTargetDetails);
    }
  }, [urlParams.staffTargetId]);

  const departmentTargetTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };
  const staffTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.first_name}</div>
      </div>
    );
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

  const searchStaff = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredStaff;

      if (!event.query.trim().length) {
        _filteredStaff = [...staffList];
      } else {
        _filteredStaff = staffList.filter((country: IStaff) => {
          return country.first_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredStaff(_filteredStaff);
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

      if (urlParams.staffTargetId) {
        updateStaffTargetsRequest(filteredObject, urlParams.staffTargetId);
      } else {
        addNewStaffTargetsRequest(filteredObject).then((res) => {
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
        {urlParams.staffTargetId ? (
          <h1 className="my-4 ml-4 text-2xl text-black">Edit Staff Target</h1>
        ) : (
          <h1 className="my-4 ml-4 text-2xl text-black">New Staff Target</h1>
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
          {/* staff__id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="staff_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Staff
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.staff_id}
                onChange={(e) => {
                  formikForm.setFieldValue("staff_id", e.target.value);
                }}
                suggestions={filteredStaff}
                field="first_name"
                completeMethod={searchStaff}
                itemTemplate={staffTemplate}
                dropdown
                placeholder="Select a staff"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("staff_id") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("staff_id")}
          </div>

          {/* supervisor_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="supervisor_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Supervisor
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.supervisor_id}
                onChange={(e) => {
                  formikForm.setFieldValue("supervisor_id", e.target.value);
                }}
                suggestions={filteredStaff}
                field="first_name"
                completeMethod={searchStaff}
                itemTemplate={staffTemplate}
                dropdown
                placeholder="Select a supervisor"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("supervisor_id") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("supervisor_id")}
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
                itemTemplate={departmentTargetTemplate}
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

          {/* description*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Target Description
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
              Success indicator
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

          {/* minimum_rating */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="minimum_rating"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Minimum rating
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
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Maximum rating
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

          {/* employee_remarks*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="employee_remarks"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Employee remarks
            </label>
            <div className="flex flex-col">
              <InputTextarea
                rows={5}
                name="employee_remarks"
                placeholder="Enter employee remarks"
                value={formikForm.values.employee_remarks}
                onChange={(e) => {
                  formikForm.setFieldValue("employee_remarks", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("employee_remarks") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("employee_remarks")}
          </div>
          {/* supervisor_remarks*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="supervisor_remarks"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Supervisor remarks
            </label>
            <div className="flex flex-col">
              <InputTextarea
                rows={5}
                name="supervisor_remarks"
                placeholder="Enter supervisor remarks"
                value={formikForm.values.supervisor_remarks}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "supervisor_remarks",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("supervisor_remarks") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("supervisor_remarks")}
          </div>

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
                placeholder="Enter status"
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
