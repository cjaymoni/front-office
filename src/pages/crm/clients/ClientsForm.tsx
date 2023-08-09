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
  IClient,
  addNewClientsRequest,
  getClientsByIdRequest,
  updateClientsRequest,
} from "./clientsApiRequests";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  status: Yup.string(),
  client_type: Yup.string(),
  client_registration_number: Yup.string(),
  client_name: Yup.string().required("Client name is required"),
  name_of_authourized_representative: Yup.string(),
  mailing_address: Yup.string().required("mailing address is required"),
  occupation: Yup.string(),
  principal_business_activity: Yup.string(),
  names_of_directors_or_partners: Yup.string(),
  name_of_employer: Yup.string(),
  registered_office: Yup.string(),
  residential_address: Yup.string(),
  tin_number: Yup.string(),
  business_phone_number: Yup.string(),
  cellphone_number: Yup.string().required("cellphone number required"),
  corporate_email: Yup.string(),
  personal_email: Yup.string(),
  opposing_party_name: Yup.string(),
  opposing_party_lawyer: Yup.string(),
});

export const ClientsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientDetails, setClientDetails] = useState<IClient>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.clientId) {
      const clientId = urlParams.clientId;
      getClientsByIdRequest(clientId).then((response) => {
        setClientDetails(response);
      });
    }
  }, [urlParams.clientId]);

  const formikForm = useFormik({
    initialValues: {
      ...clientDetails,
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

      if (urlParams.clientId) {
        updateClientsRequest(filteredObject, urlParams.clientId);
      } else {
        addNewClientsRequest(filteredObject).then((res) => {
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
        {urlParams.clientId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Client
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Client
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
        <div className="w-full p-4 grid grid-cols-3 gap-6">
          {/* client_type */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="client_type"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Client Type
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="client_type"
                placeholder="Enter client type"
                value={formikForm.values.client_type}
                onChange={(e) => {
                  formikForm.setFieldValue("client_type", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("client_type") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("client_type")}
          </div>
          {/* client_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="client_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Client Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="client_name"
                placeholder="Enter client name"
                value={formikForm.values.client_name}
                onChange={(e) => {
                  formikForm.setFieldValue("client_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("client_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("client_name")}
          </div>
          {/* client_registration_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="client_registration_number"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Client registration number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="client_registration_number"
                placeholder="Enter last name"
                value={formikForm.values.client_registration_number}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "client_registration_number",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "client_registration_number"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("client_registration_number")}
          </div>
          {/* name_of_authourized_representative */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name_of_authourized_representative"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Name of authorized representative
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="name_of_authourized_representative"
                placeholder="Enter primary phone number"
                value={formikForm.values.name_of_authourized_representative}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "name_of_authourized_representative",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "name_of_authourized_representative"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("name_of_authourized_representative")}
          </div>
          {/* mailing_address */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="mailing_address"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Mailing Address
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="mailing_address"
                placeholder="Enter mailing address"
                value={formikForm.values.mailing_address}
                onChange={(e) => {
                  formikForm.setFieldValue("mailing_address", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("mailing_address") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("mailing_address")}
          </div>
          {/* occupation */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="occupation"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Occupation
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="occupation"
                placeholder="Enter occupation"
                value={formikForm.values.occupation}
                onChange={(e) => {
                  formikForm.setFieldValue("occupation", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("occupation") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("occupation")}
          </div>
          {/* principal_business_activity */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="principal_business_activity"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Principal Business Activity
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="principal_business_activity"
                placeholder="Enter principal business activity"
                value={formikForm.values.principal_business_activity}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "principal_business_activity",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "principal_business_activity"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("principal_business_activity")}
          </div>
          {/* names_of_directors_or_partners */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="names_of_directors_or_partners"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Names of Directors / Partners
            </label>
            <div className="flex flex-col w-full">
              <Chips
                inputId="names_of_directors_or_partners"
                name="names_of_directors_or_partners"
                value={formikForm.values.names_of_directors_or_partners}
                placeholder="Enter Names of Directors / Partners"
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "names_of_directors_or_partners"
                    ),
                  },
                  "w-full p-1 text-gray-500 outline-none"
                )}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "names_of_directors_or_partners",
                    e.value
                  );
                }}
              />
            </div>
            {getFormErrorMessage("names_of_directors_or_partners")}
          </div>
          {/* name_of_employer */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name_of_employer"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Employer Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="name_of_employer"
                placeholder="Enter your name_of_employer"
                value={formikForm.values.name_of_employer}
                onChange={(e) => {
                  formikForm.setFieldValue("name_of_employer", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("name_of_employer") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("name_of_employer")}
          </div>
          {/* registered_office */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="registered_office"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Registered Office Location
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="registered_office"
                placeholder="Enter your registered office location"
                value={formikForm.values.registered_office}
                onChange={(e) => {
                  formikForm.setFieldValue("registered_office", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("registered_office") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("registered_office")}
          </div>
          {/* residential_address */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="residential_address"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Residential Address
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="residential_address"
                placeholder="Enter your residential address"
                value={formikForm.values.residential_address}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "residential_address",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("residential_address") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("residential_address")}
          </div>
          {/* tin_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="tin_number"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Tin Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="tin_number"
                placeholder="Enter your tin number"
                value={formikForm.values.tin_number}
                onChange={(e) => {
                  formikForm.setFieldValue("tin_number", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("tin_number") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("tin_number")}
          </div>
          {/* business_phone_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="business_phone_number"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Business Phone Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="business_phone_number"
                placeholder="Enter your business phone number"
                value={formikForm.values.business_phone_number}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "business_phone_number",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("business_phone_number") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("business_phone_number")}
          </div>
          {/* cellphone_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="cellphone_number"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              CellPhone Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="cellphone_number"
                placeholder="Enter your cellphone number"
                value={formikForm.values.cellphone_number}
                onChange={(e) => {
                  formikForm.setFieldValue("cellphone_number", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("cellphone_number") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("cellphone_number")}
          </div>
          {/* corporate_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="corporate_email"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Corporate Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="corporate_email"
                placeholder="Enter your corporate email"
                value={formikForm.values.corporate_email}
                onChange={(e) => {
                  formikForm.setFieldValue("corporate_email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("corporate_email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("corporate_email")}
          </div>
          {/* personal_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="personal_email"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Personal Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="personal_email"
                placeholder="Enter your personal email"
                value={formikForm.values.personal_email}
                onChange={(e) => {
                  formikForm.setFieldValue("personal_email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("personal_email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("personal_email")}
          </div>
          {/* opposing_party_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="opposing_party_name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Opposing Party Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="opposing_party_name"
                placeholder="Enter your opposing party name"
                value={formikForm.values.opposing_party_name}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "opposing_party_name",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("opposing_party_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("opposing_party_name")}
          </div>
          {/* opposing_party_lawyer */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="opposing_party_lawyer"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Opposing Party Lawyer
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="opposing_party_lawyer"
                placeholder="Enter your opposing party lawyer"
                value={formikForm.values.opposing_party_lawyer}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "opposing_party_lawyer",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("opposing_party_lawyer") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("opposing_party_lawyer")}
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
