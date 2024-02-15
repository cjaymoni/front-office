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
import {
  IJudge,
  addNewJudgesRequest,
  getJudgesByIdRequest,
  updateJudgesRequest,
} from "./judgesApiRequests";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string(),
});

export const JudgesForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [judgeDetails, setJudgeDetails] = useState<IJudge>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.judgeId) {
      const judgeId = urlParams.judgeId;
      getJudgesByIdRequest(judgeId).then((response) => {
        setJudgeDetails(response);
      });
    }
  }, [urlParams.judgeId]);

  const formikForm = useFormik({
    initialValues: {
      ...judgeDetails,
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

      if (urlParams.judgeId) {
        updateJudgesRequest(filteredObject, urlParams.judgeId);
      } else {
        addNewJudgesRequest(filteredObject).then((res) => {
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
        {urlParams.judgeId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Judge
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Judge
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
          {/* first name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="first_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              First Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="first_name"
                placeholder="Enter first name"
                value={formikForm.values.first_name}
                onChange={(e) => {
                  formikForm.setFieldValue("first_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("first_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("first_name")}
          </div>
          {/* last name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="last_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Last Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="last_name"
                placeholder="Enter last name"
                value={formikForm.values.last_name}
                onChange={(e) => {
                  formikForm.setFieldValue("last_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("last_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("last_name")}
          </div>

          {/* email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="email"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="email"
                placeholder="Enter personal email"
                value={formikForm.values.email}
                onChange={(e) => {
                  formikForm.setFieldValue("email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("email")}
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
