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
  ITransaction,
  addNewTransactionRequest,
  getTransactionByIdRequest,
  updateTransactionRequest,
} from "./transactionApiRequests";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Calendar } from "primereact/calendar";
import { Editor } from "primereact/editor";
import { DropdownWithCreate } from "../../../components/autocomplete-with-create/AutoCompleteWithCreate";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  litigation_id: Yup.string(),
  name: Yup.string(),
});

export const TransactionForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<ITransaction>();
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState(null);

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    fetchStaffRequest().then((response) => {
      setStaffList(response);
    });
  }, []);
  useEffect(() => {
    if (urlParams.transactionId) {
      const transactionId = urlParams.transactionId;
      getTransactionByIdRequest(transactionId).then((response) => {
        setTransactionDetails(response);
      });
    }
  }, [urlParams.transactionId]);

  const titleTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const countryTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.name}</div>
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

  const searchStaffs = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredStaffs;

      if (!event.query.trim().length) {
        _filteredStaffs = [...staffList];
      } else {
        _filteredStaffs = staffList.filter((country: IStaff) => {
          return country.first_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredStaff(_filteredStaffs);
    }, 250);
  };

  const formikForm = useFormik({
    initialValues: {
      ...transactionDetails,
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

      if (urlParams.transactionId) {
        updateTransactionRequest(filteredObject, urlParams.transactionId);
      } else {
        addNewTransactionRequest(filteredObject).then((res) => {
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
        {urlParams.transactionId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Transaction
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Transaction
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
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Transaction Name
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
          {/* first name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="staff"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Staff
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.staffs}
                onChange={(e) => {
                  formikForm.setFieldValue("staffs", e.target.value);
                }}
                suggestions={filteredStaff}
                completeMethod={searchStaffs}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select staff"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("staffs") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("staff")}
          </div>
          {/* last name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="litigation_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Litigation
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.staffs}
                onChange={(e) => {
                  formikForm.setFieldValue("staffs", e.target.value);
                }}
                suggestions={filteredStaff}
                completeMethod={searchStaffs}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select Litigation"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("staffs") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("litigation_id")}
          </div>

          {/* suite_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="suite_number"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Suite number
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="suite_number"
                placeholder="Enter  suite number "
                value={formikForm.values.suite_number}
                onChange={(e) => {
                  formikForm.setFieldValue("suite_number", e.target.value);
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid("suite_number"),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("suite_number")}
          </div>

          {/* client */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="client"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Client
            </label>
            <div className="flex flex-col">
              <DropdownWithCreate
                optionLabel="label"
                optionValue="value"
                value={formikForm.values.client}
                onChange={(e) => {
                  formikForm.setFieldValue("client", e.target.value);
                }}
                placeholder="Select a client"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("client") },
                  "w-full  text-gray-500 outline-none"
                )}
                options={[]}
                inputName="client"
                onButtonClick={() => console.log("3")}
              />
            </div>
            {getFormErrorMessage("client")}
          </div>

          {/* lawyer_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="lawyer_id"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Lawyer
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.supervising_partners}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "supervising_partners",
                    e.target.value
                  );
                }}
                suggestions={filteredStaff}
                completeMethod={searchStaffs}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select supervising partner"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("supervising_partners") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("lawyer_id")}
          </div>

          {/* start_date */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="start_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Start Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="start_date"
                name="start_date"
                value={
                  formikForm.values.start_date
                    ? new Date(formikForm.values.start_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("start_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("start_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("start_date")}
          </div>

          {/* end_date */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="end_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              End Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="end_date"
                name="end_date"
                value={
                  formikForm.values.end_date
                    ? new Date(formikForm.values.end_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("end_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("end_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("end_date")}
          </div>

          {/* staffs */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="staffs"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Staffs
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.staffs}
                onChange={(e) => {
                  formikForm.setFieldValue("staffs", e.target.value);
                }}
                suggestions={filteredStaff}
                completeMethod={searchStaffs}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select staff"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("staffs") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("staffs")}
          </div>
          {/* courts */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="courts"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Select Court
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.courts}
                onChange={(e) => {
                  formikForm.setFieldValue("courts", e.target.value);
                }}
                suggestions={[]}
                //completeMethod={searchStaffs}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select court"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("courts") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("courts")}
          </div>
          {/* hearings */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="hearings"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Select Hearing
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.hearings}
                onChange={(e) => {
                  formikForm.setFieldValue("hearings", e.target.value);
                }}
                suggestions={[]}
                //completeMethod={()=>()}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select hearing"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("hearings") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("hearings")}
          </div>
          {/* categories */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="categories"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Categories
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.categories}
                onChange={(e) => {
                  formikForm.setFieldValue("categories", e.target.value);
                }}
                // completeMethod={searchBriefCategories}
                field="title"
                dropdown
                multiple
                suggestions={[]}
                // itemTemplate={briefTypesTemplate}
                placeholder="Select a category"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("categories") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("categories")}
          </div>

          {/* opposing_parties */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="opposing_parties"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Opposing Party
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.opposing_parties}
                onChange={(e) => {
                  formikForm.setFieldValue("opposing_parties", e.target.value);
                }}
                //completeMethod={searchOpposingParties}
                field="first_name"
                dropdown
                multiple
                suggestions={[]}
                itemTemplate={staffTemplate}
                placeholder="Select opposing party"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("opposing_parties") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("opposing_parties")}
          </div>
        </div>

        <Accordion activeIndex={0} className="w-full grid grid-cols-2 gap-4">
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

          <AccordionTab header="Background">
            <Editor
              placeholder={"Enter background .."}
              value={formikForm.values.background}
              onTextChange={(e) =>
                formikForm.setFieldValue("background", e.htmlValue)
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
