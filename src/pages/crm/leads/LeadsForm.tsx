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

import { InputNumber } from "primereact/inputnumber";

import { Dropdown } from "primereact/dropdown";

import { IStaff, fetchStaffRequest } from "../../staff/staffApiRequests";
import { AutoComplete } from "primereact/autocomplete";
import {
  ILeads,
  addNewLeadsRequest,
  getLeadsByIdRequest,
  updateLeadsRequest,
} from "./leadsApiRequests";
import { SelectButton } from "primereact/selectbutton";
import {
  IComment,
  fetchCommentsRequest,
} from "../comments/commentsApiRequests";
import { ISector, fetchSectorsRequest } from "../../sectors/sectorApiRequest";
import {
  IAttachment,
  fetchAttachmentsRequest,
} from "../attachments/attachmentsApiRequests";
import {
  IContact,
  fetchContactsRequest,
} from "../contacts/contactsApiRequests";
import {
  IPracticeArea,
  fetchPracticeAreasRequest,
} from "../../practice-areas/practiceAreasApiRequest";

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
});

export const LeadsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadDetails, setLeadDetails] = useState<ILeads>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  const activeOptions = [
    { name: "Active", value: true },
    { name: "Inactive", value: false },
  ];

  useEffect(() => {
    if (urlParams.leadId) {
      const leadId = urlParams.leadId;
      getLeadsByIdRequest(leadId).then((response) => {
        setLeadDetails(response);
      });
    }
  }, [urlParams.leadId]);

  const titleTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const commentTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.comment}</div>
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

  const attachmentsTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.file_name}</div>
      </div>
    );
  };

  const formikForm = useFormik({
    initialValues: {
      ...leadDetails,
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

      if (urlParams.leadId) {
        updateLeadsRequest(filteredObject, urlParams.leadId);
      } else {
        addNewLeadsRequest(filteredObject).then((res) => {
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
        {urlParams.leadId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Lead
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Lead
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
          {/* salutation */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="salutation"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Salutation
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="salutation"
                placeholder="Enter salutation"
                value={formikForm.values.salutation}
                onChange={(e) => {
                  formikForm.setFieldValue("salutation", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("salutation") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("salutation")}
          </div>
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
          {/* primary_cellphone */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="primary_cellphone"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Primary Cellphone
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="primary_cellphone"
                placeholder="Enter primary phone number"
                value={formikForm.values.primary_cellphone}
                onChange={(e) => {
                  formikForm.setFieldValue("primary_cellphone", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("primary_cellphone") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("primary_cellphone")}
          </div>
          {/* secondary_phone */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="secondary_cellphone"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Phone 2
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="secondary_cellphone"
                placeholder="Enter phone number"
                value={formikForm.values.secondary_cellphone}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "secondary_cellphone",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("secondary_cellphone") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("secondary_cellphone")}
          </div>
          {/* primary_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="primary_email"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Primary Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="primary_email"
                placeholder="Enter personal email"
                value={formikForm.values.primary_email}
                onChange={(e) => {
                  formikForm.setFieldValue("primary_email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("primary_email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("primary_email")}
          </div>
          {/* secondary_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="secondary_email"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Secondary Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="secondary_email"
                placeholder="Enter official email"
                value={formikForm.values.secondary_email}
                onChange={(e) => {
                  formikForm.setFieldValue("secondary_email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("secondary_email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("secondary_email")}
          </div>
          {/* address_line */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="address_line"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Address Line
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="address_line"
                placeholder="Enter your address line"
                value={formikForm.values.address_line}
                onChange={(e) => {
                  formikForm.setFieldValue("address_line", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("address_line") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("address_line")}
          </div>
          {/* street */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="street"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Street
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="street"
                placeholder="Enter your street"
                value={formikForm.values.street}
                onChange={(e) => {
                  formikForm.setFieldValue("street", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("street") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("street")}
          </div>
          {/* city */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="city"
              className="font-medium text-left mb-3 text-gray-500"
            >
              City
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formikForm.values.city}
                onChange={(e) => {
                  formikForm.setFieldValue("city", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("city") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("city")}
          </div>
          {/* state_region */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="state_region"
              className="font-medium text-left mb-3 text-gray-500"
            >
              State
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="state_region"
                placeholder="Enter your state_region"
                value={formikForm.values.state_region}
                onChange={(e) => {
                  formikForm.setFieldValue("state_region", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("state_region") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("state_region")}
          </div>
          {/* postcode */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="postcode"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Postcode
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="postcode"
                placeholder="Enter your postcode"
                value={formikForm.values.postcode}
                onChange={(e) => {
                  formikForm.setFieldValue("postcode", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("postcode") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("postcode")}
          </div>
          {/* website */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="website"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Website
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="website"
                placeholder="Enter your website"
                value={formikForm.values.website}
                onChange={(e) => {
                  formikForm.setFieldValue("website", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("website") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("website")}
          </div>

          {/* estimated_value */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="estimated_value"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Estimated value
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="estimated_value"
                name="estimated_value"
                value={formikForm.values.estimated_value}
                onValueChange={(e) =>
                  formikForm.setFieldValue("estimated_value", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={100}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("estimated_value") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("estimated_value")}
          </div>
          {/* probability */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="probability"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Probability
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="probability"
                name="probability"
                value={formikForm.values.probability}
                onValueChange={(e) =>
                  formikForm.setFieldValue("probability", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={100}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("probability") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("probability")}
          </div>
          {/* is_active */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="is_active"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Status
            </label>
            <div className="flex flex-col">
              <SelectButton
                id="is_active"
                name="is_active"
                value={formikForm.values.is_active}
                options={activeOptions}
                optionLabel="name"
                onChange={(e) => {
                  formikForm.setFieldValue("is_active", e.value);
                }}
                className={classNames("w-full text-gray-500 outline-none", {
                  "p-invalid": formikForm.errors.is_active,
                })}
              />
            </div>
            {getFormErrorMessage("is_active")}
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
