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
  IVisitCategory,
  addNewVisitCategoryRequest,
  getVisitCategoryByIdRequest,
  updateVisitCategoryRequest,
} from "./vistCategoryApiRequest";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Editor } from "primereact/editor";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  category: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("category name is Required"),
  description: Yup.string().min(2, "Too Short!").max(200, "Too Long!"),
});

export const VisitCategoryForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visitCategoryDetails, setVisitEntryDetails] =
    useState<IVisitCategory>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.visitCategoryId) {
      const visitCategoryId = urlParams.visitCategoryId;
      getVisitCategoryByIdRequest(visitCategoryId).then((response) => {
        setVisitEntryDetails(response);
      });
    }
  }, [urlParams.visitCategoryId]);

  const formikForm = useFormik({
    initialValues: {
      ...visitCategoryDetails,
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

      if (urlParams.visitCategoryId) {
        updateVisitCategoryRequest(filteredObject, urlParams.visitCategoryId);
      } else {
        addNewVisitCategoryRequest(filteredObject).then((res) => {
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
        {urlParams.visitCategoryId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Visit Category
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Visit Category
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
          {/* category */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="category"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Category name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="category"
                placeholder="Enter category name"
                value={formikForm.values.category}
                onChange={(e) => {
                  formikForm.setFieldValue("category", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("category") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("category")}
          </div>

          {/* description */}
          {/* <div className="flex flex-col mb-4">
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
          </div> */}
        </div>
        <Accordion activeIndex={0}>
          {/* description*/}

          <AccordionTab header="Description">
            <Editor
              placeholder={"Enter description .."}
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
