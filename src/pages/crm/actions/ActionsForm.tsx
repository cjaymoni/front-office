/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { ErrorMessagBox, ErrorMessageBox } from "../../../utils/utils";
import {
  IActions,
  addNewActionsRequest,
  getActionsByIdRequest,
  updateActionsRequest,
} from "./actionsApiRequests";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  priority: Yup.string(),
  start_date_time: Yup.string().required("start date is required"),
  close_date_time: Yup.string(),
  duration: Yup.number().required("duration is required"),
  status_id: Yup.string(),
  assigned_to_ids: Yup.mixed(),
  team_ids: Yup.mixed(),
  contact_ids: Yup.mixed(),
});

export const ActionsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actionDetails, setActionDetails] = useState<IActions>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.actionId) {
      const actionId = urlParams.actionId;
      getActionsByIdRequest(actionId).then((response) => {
        setActionDetails(response);
      });
    }
  }, [urlParams.actionId]);

  const formikForm = useFormik({
    initialValues: {
      ...actionDetails,
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

      if (urlParams.actionId) {
        updateActionsRequest(filteredObject, urlParams.actionId);
      } else {
        addNewActionsRequest(filteredObject).then((res) => {
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

  const priorityLevel = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];
  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.actionId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Action
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Action
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
          {/* name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Action Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="name"
                placeholder="Enter name"
                value={formikForm.values.name}
                onChange={(e) => {
                  formikForm.setFieldValue("name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("name")}
          </div>

          {/* priority */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="priority"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Priority
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={formikForm.values.priority}
                onChange={(e) => {
                  formikForm.setFieldValue("priority", e.target.value);
                }}
                options={priorityLevel}
                optionLabel="label"
                showClear
                placeholder="Select a priority"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("priority") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("priority")}
          </div>

          {/* start_date_time */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="start_date_time"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Start Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="start_date_time"
                name="start_date_time"
                value={formikForm.values.start_date_time}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("start_date_time"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("start_date_time", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("start_date_time")}
          </div>

          {/* end_date_time */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="end_date_time"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              End Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="end_date_time"
                name="end_date_time"
                value={formikForm.values.end_date_time}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("end_date_time"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("end_date_time", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("end_date_time")}
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
          {/* duration */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="duration"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Duration
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="duration"
                name="duration"
                value={formikForm.values.duration}
                onValueChange={(e) =>
                  formikForm.setFieldValue("duration", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={100}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("duration") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("duration")}
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
