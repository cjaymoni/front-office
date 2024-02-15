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
  IBriefsCategory,
  addNewBriefCategoryRequest,
  getBriefCategoryByIdRequest,
  updateBriefCategoryRequest,
} from "./briefsCategoryApiRequests";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Editor } from "primereact/editor";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
});

export const BriefsCategoryForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [briefsCategoryDetails, setBriefsCategoryDetails] =
    useState<IBriefsCategory>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.briefsCategoryId) {
      const briefsCategoryId = urlParams.briefsCategoryId;
      getBriefCategoryByIdRequest(briefsCategoryId).then((response) => {
        setBriefsCategoryDetails(response);
      });
    }
  }, [urlParams.briefsCategoryId]);

  const formikForm = useFormik({
    initialValues: {
      ...briefsCategoryDetails,
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

      if (urlParams.briefsCategoryId) {
        updateBriefCategoryRequest(filteredObject, urlParams.briefsCategoryId);
      } else {
        addNewBriefCategoryRequest(filteredObject).then((res) => {
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
        {urlParams.briefsCategoryId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Briefs Category
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Briefs Category
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
          {/* <div className="flex flex-col mb-4">
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
          </div> */}

          {/* briefs */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="briefs"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Briefs
            </label>
            <div className="flex flex-col">
              <InputText
                type="briefs"
                name="briefs"
                placeholder="Enter  briefs"
                value={formikForm.values.briefs}
                onChange={(e) => {
                  formikForm.setFieldValue("briefs", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("briefs") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("briefs")}
          </div>

          {/* description */}
          <div className="flex flex-col mb-4">
            <Accordion activeIndex={0} className="w-full ">
              <AccordionTab header="Description">
                <Editor
                  placeholder={"Enter Description .."}
                  value={formikForm.values.description}
                  onTextChange={(e) =>
                    formikForm.setFieldValue("description", e.htmlValue)
                  }
                  style={{ height: "320px" }}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                    clipboard: {
                      // toggle to add extra line breaks when pasting HTML:
                      matchVisual: false,
                    },
                  }}
                />
              </AccordionTab>
            </Accordion>

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
      </form>
    </div>
  );
};
