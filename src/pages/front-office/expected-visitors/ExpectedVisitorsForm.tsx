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
  getExpectedVisitorsByIdRequest,
  updateExpectedVisitorsRequest,
  addNewExpectedVisitorsRequest,
  IExpectedVisitors,
} from "./expectedVisitorsApiRequest";
import { AutoComplete } from "primereact/autocomplete";
import { fetchStaffRequest, IStaff } from "../../staff/staffApiRequests";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Editor } from "primereact/editor";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  visitor_name: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Visitor name is Required"),
  visitor_email: Yup.string().min(2, "Too Short!").max(200, "Too Long!"),
  visitor_phone: Yup.string(),
  visit_purpose: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Visit purpose is Required"),
  visit_date: Yup.date().required("date is required"),
});

export const ExpectedVisitorsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expectedVisitorDetails, setExpectedVisitorDetails] =
    useState<IExpectedVisitors>();

  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();
  const [filteredStaff, setFilteredStaff] = useState(null);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffRequest().then((response) => {
      setStaffList(response);
    });
  }, []);
  useEffect(() => {
    if (urlParams.expectedVisitorId) {
      const expectedVisitorId = urlParams.expectedVisitorId;
      getExpectedVisitorsByIdRequest(expectedVisitorId).then((response) => {
        setExpectedVisitorDetails(response);
      });

      //   setExpectedVisitorDetails(props.expectedVisitorDetails);
    }
  }, [urlParams.expectedVisitorId]);
  const staffTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.first_name}</div>
      </div>
    );
  };
  const searchStaff = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredStaff;

      if (!event.query.trim().length) {
        _filteredStaff = [...staffList];
      } else {
        _filteredStaff = staffList.filter((country: IStaff) => {
          return country.first_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredStaff(_filteredStaff);
    }, 250);
  };
  const formikForm = useFormik({
    initialValues: {
      ...expectedVisitorDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
        visit_date: (values.visit_date / 1000).toString(),
        person_to_see_id: values.person_to_see?.id,
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.expectedVisitorId) {
        updateExpectedVisitorsRequest(
          filteredObject,
          urlParams.expectedVisitorId
        );
      } else {
        addNewExpectedVisitorsRequest(filteredObject).then((res) => {
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
        {urlParams.expectedVisitorId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Expected Visit
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Expected Visit
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
        <div className="w-full p-4 grid grid-cols-2 gap-4">
          {/* visitor_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visitor name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="visitor_name"
                placeholder="Enter visitor name"
                value={formikForm.values.visitor_name}
                onChange={(e) => {
                  formikForm.setFieldValue("visitor_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("visitor_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("visitor_name")}
          </div>

          {/* visitor_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_email"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Visitor email address
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="visitor_email"
                placeholder="Enter visitor email"
                value={formikForm.values.visitor_email}
                onChange={(e) => {
                  formikForm.setFieldValue("visitor_email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("visitor_email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("visitor_email")}
          </div>

          {/* visitor_phone */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visitor_phone"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visitor phone number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="visitor_phone"
                placeholder="Enter visitor phone number"
                value={formikForm.values.visitor_phone}
                onChange={(e) => {
                  formikForm.setFieldValue("visitor_phone", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("visitor_phone") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("visitor_phone")}
          </div>

          {/* person_to_see */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="person_to_see"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Person to see
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.person_to_see}
                onChange={(e) => {
                  formikForm.setFieldValue("person_to_see", e.target.value);
                }}
                suggestions={filteredStaff}
                field="first_name"
                completeMethod={searchStaff}
                itemTemplate={staffTemplate}
                dropdown
                placeholder="Select a person to see"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("person_to_see") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("person_to_see")}
          </div>

          {/* visit_date  */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="visit_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visit Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="visit_date"
                name="visit_date"
                value={
                  formikForm.values.visit_date
                    ? new Date(formikForm.values.visit_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("visit_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("visit_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("visit_date")}
          </div>

          {/* visit_purpose */}
          <div className="flex flex-col mb-4">
            <Accordion activeIndex={0} className="w-full ">
              <AccordionTab header="Visit purpose">
                <Editor
                  placeholder={"Enter Visit purpose .."}
                  value={formikForm.values.visit_purpose}
                  onTextChange={(e) =>
                    formikForm.setFieldValue("visit_purpose", e.htmlValue)
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
            {/* <label
              htmlFor="visit_purpose"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Visit purpose
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="visit_purpose"
                placeholder="Enter  visit purpose"
                value={formikForm.values.visit_purpose}
                onChange={(e) => {
                  formikForm.setFieldValue("visit_purpose", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("visit_purpose") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div> */}
            {getFormErrorMessage("visit_purpose")}
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
      </form>{" "}
    </div>
  );
};
