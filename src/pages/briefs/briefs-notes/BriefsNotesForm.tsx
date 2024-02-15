import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IBriefsNotes,
  addNewBriefNotesRequest,
  getBriefNotesByIdRequest,
  updateBriefNotesRequest,
} from "./briefsNotesApiRequests";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { style } from "typestyle";
import { FormField } from "../../../utils/FormField";
import { ErrorMessagBox, ErrorMessageBox } from "../../../utils/utils";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
export const BriefsNotesForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [briefsNoteDetails, setBriefsDocumentDetails] =
    useState<IBriefsNotes>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.briefsNoteId) {
      const briefsNoteId = urlParams.briefsNoteId;
      getBriefNotesByIdRequest(briefsNoteId).then((response) => {
        setBriefsDocumentDetails(response);
      });
    }
  }, [urlParams.briefsNoteId]);

  const formikForm = useFormik({
    initialValues: {
      ...briefsNoteDetails,
    },
    // validationSchema: SignupSchema,
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

      if (urlParams.briefsDocumentId) {
        updateBriefNotesRequest(filteredObject, urlParams.briefsDocumentId);
      } else {
        addNewBriefNotesRequest(filteredObject).then((res) => {
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

  const fields = [
    {
      label: "Title",
      fieldType: "text",
      fieldName: "title",
      formikForm: formikForm,
      placeholder: "Enter title",
    },

    {
      label: "Date",
      fieldType: "date",
      fieldName: "date",
      formikForm: formikForm,
      placeholder: "Select date",
    },
    {
      label: "Staff",
      fieldType: "text",
      fieldName: "staff",
      formikForm: formikForm,
      placeholder: "Enter staff",
    },
    {
      label: "Select Brief",
      fieldType: "dropdown",
      fieldName: "brief.brief_id",
      formikForm: formikForm,
      placeholder: "Select brief",
    },
    {
      label: "Body",
      fieldType: "editor",
      fieldName: "body",
      formikForm: formikForm,
      placeholder: "Enter body",
    },
  ];

  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.briefId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Brief Note
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Brief Note
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
          {fields.map((item, index) => (
            <FormField
              key={index}
              fieldName={item.fieldName}
              fieldType={item.fieldType}
              formikForm={formikForm}
              label={item.label}
              placeholder={item.placeholder}
            />
          ))}
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
            severity="danger"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
};
