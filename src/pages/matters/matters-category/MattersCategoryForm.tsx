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

import { InputTextarea } from "primereact/inputtextarea";
import {
  IMattersCategory,
  addNewMatterCategoryRequest,
  getMatterCategoryByIdRequest,
  updateMatterCategoryRequest,
} from "./mattersCategoryApiRequests";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
});

export const MattersCategoryForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mattersCategoryDetails, setMattersCategoryDetails] =
    useState<IMattersCategory>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.mattersCategoryId) {
      const mattersCategoryId = urlParams.mattersCategoryId;
      getMatterCategoryByIdRequest(mattersCategoryId).then((response) => {
        setMattersCategoryDetails(response);
      });
    }
  }, [urlParams.mattersCategoryId]);

  const formikForm = useFormik({
    initialValues: {
      ...mattersCategoryDetails,
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

      if (urlParams.mattersCategoryId) {
        updateMatterCategoryRequest(
          filteredObject,
          urlParams.mattersCategoryId
        );
      } else {
        addNewMatterCategoryRequest(filteredObject).then((res) => {
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
        {urlParams.mattersCategoryId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Matters Category
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Matters Category
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
          {/*  name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="name"
                placeholder="Enter category name"
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
                placeholder="Enter last name"
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

          {/* matters */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="matters"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Matters
            </label>
            <div className="flex flex-col">
              <InputText
                type="matters"
                name="matters"
                placeholder="Enter  matters"
                value={formikForm.values.matters}
                onChange={(e) => {
                  formikForm.setFieldValue("matters", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("matters") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("matters")}
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
