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
  IOpposingParty,
  addNewOpposingPartiesRequest,
  fetchOpposingPartiesRequest,
  getOpposingPartiesByIdRequest,
  updateOpposingPartiesRequest,
} from "../opposing-party/opposingPArtyApiRequests";

import { FormField } from "../../../utils/FormField";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  status: Yup.string(),
  description: Yup.string(),
  salutation: Yup.string(),
  first_name: Yup.string(),
  last_name: Yup.string(),
  primary_email: Yup.string(),
  secondary_email: Yup.string(),
  primary_cellphone: Yup.string(),
  secondary_cellphone: Yup.string(),
  address_line: Yup.string(),
  city: Yup.string(),
  street: Yup.string(),
  state_region: Yup.string(),
  postcode: Yup.string(),
  website: Yup.string(),
  estimated_value: Yup.number(),
  probability: Yup.number(),
  background: Yup.string(),
});

export const PartnerForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [briefDetails, setBriefDetails] = useState<any>();

  const [briefTypes, setBriefTypes] = useState([]);

  const urlParams = useParams();

  const [newBriefType, setNewBriefType] = useState("");

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.briefId) {
      const briefId = urlParams.briefId;
      getOpposingPartiesByIdRequest(briefId).then((response) => {
        setBriefDetails(response);
      });
    }
  }, [urlParams.briefId]);

  const formikForm = useFormik({
    initialValues: {
      ...briefDetails,
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

      if (urlParams.briefId) {
        updateOpposingPartiesRequest(filteredObject, urlParams.briefId);
      } else {
        addNewOpposingPartiesRequest(filteredObject).then((res) => {
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
      label: "Name",
      fieldType: "text",
      fieldName: "name",
      formikForm: formikForm,
      placeholder: "Enter name",
    },
    {
      label: "Partner Initials",
      fieldType: "text",
      fieldName: "partner_initials",
      formikForm: formikForm,
      placeholder: "Enter partner initials",
    },
    {
      label: "Authors Initials",
      fieldType: "text",
      fieldName: "authors_initials",
      formikForm: formikForm,
      placeholder: "Enter authors initials",
    },
    {
      label: "Phone Number",
      fieldType: "text",
      fieldName: "phone_number",
      formikForm: formikForm,
      placeholder: "Enter phone number",
    },
  ];

  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.briefId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Partner
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Partner
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
