/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";
import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import {
  IStaff,
  getStaffByIdRequest,
  updateStaffRequest,
} from "./staffApiRequests";
import { Dropdown } from "primereact/dropdown";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { ErrorMessagBox, ErrorMessageBox } from "../../utils/utils";
import { addNewStaffRequest } from "./staffApiRequests";
import { AutoComplete } from "primereact/autocomplete";
import { fetchDepartmentsRequest } from "../departments/departmentsApiRequests";
import { fetchDesignationsRequest } from "../designations/designationsApiRequests";
import {
  IPracticeArea,
  fetchPracticeAreasRequest,
} from "../practice-areas/practiceAreasApiRequest";
import { MultiSelect } from "primereact/multiselect";
import { ISector, fetchSectorsRequest } from "../sectors/sectorApiRequest";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is Required"),
  personal_email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  date_of_birth: Yup.date().required("date required"),
});

export const StaffForm1 = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [staffDetails, setStaffDetails] = useState<IStaff>();
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.staffId) {
      const staffId = urlParams.staffId;
      getStaffByIdRequest(staffId).then((response) => {
        setStaffDetails(response);
      });

      //   setStaffDetails(props.staffDetails);
    }
  }, [urlParams.staffId]);

  useEffect(() => {
    fetchDepartmentsRequest().then((response) => {
      setDepartments(response);
    });
    fetchDesignationsRequest().then((response) => {
      setDesignations(response);
    });
    fetchPracticeAreasRequest().then((response) => {
      setPracticeAreas(response);
    });
    fetchSectorsRequest().then((response) => {
      setSectors(response);
    });
  }, []);

  const departmentTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.name}</div>
      </div>
    );
  };

  const designationTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const formikForm = useFormik({
    initialValues: {
      ...staffDetails,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const practIds = values.practice_area_ids?.map((item) => item.id);
      const sectIds = values.sector_ids?.map((item) => item.id);

      const it = {
        ...values,
        date_of_birth: (values.date_of_birth / 1000).toString(),
        hire_date: (values.hire_date / 1000).toString(),
        year_called_to_bar: (values.year_called_to_bar / 1000).toString(),
        end_date: (values.end_date / 1000).toString(),
        department_id: values.department?.id,
        designation_id: values.designation?.id,
        practice_area_ids: practIds,
        sector_ids: sectIds,
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});

      if (urlParams.staffId) {
        updateStaffRequest(filteredObject, urlParams.staffId);
      } else {
        addNewStaffRequest(filteredObject).then((res) => {
          if (res.response.status === 422) {
            setServerErrors({ ...res.response.data });

            scrollToElement(targetRef);
          }
          if (res.response.status === 201) {
            navigate("/staff");
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

  const genders = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];
  // const departments = [{ name: "man", value: "ejkr" }];
  const overtimeOptions = [
    { name: "Allowed", value: true },
    { name: "Not allowed", value: false },
  ];

  const [filteredDepartments, setFilteredDepartments] = useState(null);
  const [filteredDesignations, setFilteredDesignations] = useState(null);
  const [filteredPracticeAreas, setFilteredPracticeAreas] = useState(null);
  const [filteredSectors, setFilteredSectors] = useState(null);
  const searchDepartments = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredDepartments;

      if (!event.query.trim().length) {
        _filteredDepartments = [...departments];
      } else {
        _filteredDepartments = departments.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredDepartments(_filteredDepartments);
    }, 250);
  };

  const searchDesignations = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredDesignations;

      if (!event.query.trim().length) {
        _filteredDesignations = [...designations];
      } else {
        _filteredDesignations = designations.filter((country) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredDesignations(_filteredDesignations);
    }, 250);
  };

  const searchPracticeAreas = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredPracticeAreas;

      if (!event.query.trim().length) {
        _filteredPracticeAreas = [...practiceAreas];
      } else {
        _filteredPracticeAreas = practiceAreas.filter(
          (country: IPracticeArea) => {
            return country.title
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredPracticeAreas(_filteredPracticeAreas);
    }, 250);
  };

  const searchSectors = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredSectors;

      if (!event.query.trim().length) {
        _filteredSectors = [...sectors];
      } else {
        _filteredSectors = sectors.filter((country: ISector) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredSectors(_filteredSectors);
    }, 250);
  };

  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.staffId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Staff
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Staff
          </h1>
        )}{" "}
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
          {/* date of birth */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="date_of_birth"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Date of birth
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="date_of_birth"
                name="date_of_birth"
                value={
                  formikForm.values.date_of_birth
                    ? new Date(formikForm.values.date_of_birth)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("date_of_birth"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("date_of_birth", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("date_of_birth")}
          </div>
          {/* phone 1 */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="cellphone_1"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Phone 1
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="cellphone_1"
                placeholder="Enter phone number"
                value={formikForm.values.cellphone_1}
                onChange={(e) => {
                  formikForm.setFieldValue("cellphone_1", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("cellphone_1") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("cellphone_1")}
          </div>
          {/* phone 2 */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="cellphone_2"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Phone 2
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="cellphone_2"
                placeholder="Enter phone number"
                value={formikForm.values.cellphone_2}
                onChange={(e) => {
                  formikForm.setFieldValue("cellphone_2", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("cellphone_2") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("cellphone_2")}
          </div>
          {/* gender */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="gender"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Gender
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={formikForm.values.gender}
                onChange={(e) => {
                  formikForm.setFieldValue("gender", e.target.value);
                }}
                options={genders}
                optionLabel="name"
                showClear
                placeholder="Select a gender"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("gender") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("gender")}
          </div>
          {/* location */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="location"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Location
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="location"
                placeholder="Enter your location"
                value={formikForm.values.location}
                onChange={(e) => {
                  formikForm.setFieldValue("location", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("location") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("location")}
          </div>
          {/* personal email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="personal_email"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Personal Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="personal_email"
                placeholder="Enter personal email"
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
          {/* official_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="official_email"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Official Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="official_email"
                placeholder="Enter official email"
                value={formikForm.values.official_email}
                onChange={(e) => {
                  formikForm.setFieldValue("official_email", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("official_email") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("official_email")}
          </div>
          {/* department id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="department_id"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Department
            </label>
            <div className="flex flex-col">
              <AutoComplete
                itemTemplate={departmentTemplate}
                value={formikForm.values.department}
                onChange={(e) => {
                  formikForm.setFieldValue("department", e.target.value);
                }}
                suggestions={filteredDepartments}
                completeMethod={searchDepartments}
                placeholder="Select a department"
                field="name"
                dropdown
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("department") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("department")}
          </div>
          {/* designation id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="designation_id"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Designation
            </label>
            <div className="flex flex-col">
              <AutoComplete
                dropdown
                value={formikForm.values.designation}
                onChange={(e) => {
                  formikForm.setFieldValue("designation", e.target.value);
                }}
                suggestions={filteredDesignations}
                field="title"
                itemTemplate={designationTemplate}
                completeMethod={searchDesignations}
                placeholder="Select a designation_id"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("designation") },
                  "w-full  text-gray-500 outline-none"
                )}
                emptyMessage="no data"
              />
            </div>
            {getFormErrorMessage("designation")}
          </div>

          {/* practice areas */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="practice_area_ids"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Practice Areas
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.practice_area_ids}
                onChange={(e) => {
                  formikForm.setFieldValue("practice_area_ids", e.target.value);
                }}
                suggestions={filteredPracticeAreas}
                completeMethod={searchPracticeAreas}
                multiple
                field="title"
                dropdown
                itemTemplate={designationTemplate}
                placeholder="Select a practice area"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("practice_area_ids") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("practice_area_ids")}
          </div>

          {/* sectors*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="sector_ids"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Sectors
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.sector_ids}
                onChange={(e) => {
                  formikForm.setFieldValue("sector_ids", e.target.value);
                }}
                completeMethod={searchSectors}
                field="title"
                dropdown
                multiple
                suggestions={filteredSectors}
                itemTemplate={designationTemplate}
                placeholder="Select a sector"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("sector_ids") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("sector_ids")}
          </div>
          {/* linkedin */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="linkedin"
              className="font-medium text-left mb-3 text-gray-500"
            >
              LinkedIn URL
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="linkedin"
                placeholder="Enter official email"
                value={formikForm.values.linkedin}
                onChange={(e) => {
                  formikForm.setFieldValue("linkedin", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("linkedin") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("linkedin")}
          </div>
          {/* tin */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="tin"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Tax Identification Number (TIN)
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="tin"
                placeholder="Enter tin number"
                value={formikForm.values.tin}
                onChange={(e) => {
                  formikForm.setFieldValue("tin", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("tin") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("tin")}
          </div>
          {/* ssn */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="ssn"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Social Security Number (SSN)
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="ssn"
                placeholder="Enter social security number"
                value={formikForm.values.ssn}
                onChange={(e) => {
                  formikForm.setFieldValue("ssn", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("ssn") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("ssn")}
          </div>
          {/* national_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="national_id"
              className="font-medium text-left mb-3 text-gray-500"
            >
              National ID
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="national_id"
                placeholder="Enter national id"
                value={formikForm.values.national_id}
                onChange={(e) => {
                  formikForm.setFieldValue("national_id", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("national_id") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("national_id")}
          </div>
          {/* nhis */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="nhis"
              className="font-medium text-left mb-3 text-gray-500"
            >
              NHIS Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="nhis"
                placeholder="Enter nhis number"
                value={formikForm.values.nhis}
                onChange={(e) => {
                  formikForm.setFieldValue("nhis", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("nhis") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("nhis")}
          </div>
          {/* hire_date */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="hire_date"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Date of Hire
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="hire_date"
                name="hire_date"
                value={
                  formikForm.values.hire_date
                    ? new Date(formikForm.values.hire_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("hire_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("hire_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("hire_date")}
          </div>
          {/* end_date */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="end_date"
              className="font-medium text-left mb-3 text-gray-500"
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
          {/* registration_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="registration_number"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Registration Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="registration_number"
                placeholder="Enter registration number"
                value={formikForm.values.registration_number}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "registration_number",
                    e.target.value
                  );
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("registration_number") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("registration_number")}
          </div>
          {/* year_called_to_bar */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="year_called_to_bar"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Year called to bar
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="year_called_to_bar"
                name="year_called_to_bar"
                value={
                  formikForm.values.year_called_to_bar
                    ? new Date(formikForm.values.year_called_to_bar)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("year_called_to_bar"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "year_called_to_bar",
                    e.target.value
                  );
                }}
                showIcon
                placeholder="yyyy"
                view="year"
                dateFormat="yy"
              />
            </div>
            {getFormErrorMessage("year_called_to_bar")}
          </div>
          {/* salary */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="salary"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Salary
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="salary"
                name="salary"
                value={formikForm.values.salary}
                onValueChange={(e) =>
                  formikForm.setFieldValue("salary", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("salary") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("salary")}
          </div>
          {/* rate_per_matter */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="rate_per_matter"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Rate per matter
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="rate_per_matter"
                name="rate_per_matter"
                value={formikForm.values.rate_per_matter}
                onValueChange={(e) =>
                  formikForm.setFieldValue("rate_per_matter", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("rate_per_matter") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("rate_per_matter")}
          </div>
          {/* commission_per_matter */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="commission_per_matter"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Commission per matter
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="commission_per_matter"
                name="commission_per_matter"
                value={formikForm.values.commission_per_matter}
                onValueChange={(e) =>
                  formikForm.setFieldValue("commission_per_matter", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("commission_per_matter") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("commission_per_matter")}
          </div>
          {/* overtime_allowed */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="overtime_allowed"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Overtime allowed
            </label>
            <div className="flex flex-col">
              <SelectButton
                id="overtime_allowed"
                name="overtime_allowed"
                value={formikForm.values.overtime_allowed}
                options={overtimeOptions}
                optionLabel="name"
                onChange={(e) => {
                  formikForm.setFieldValue("overtime_allowed", e.value);
                }}
                className={classNames("w-full text-gray-500 outline-none", {
                  "p-invalid": formikForm.errors.overtime_allowed,
                })}
              />
            </div>
            {getFormErrorMessage("overtime_allowed")}
          </div>
          {/* leave_days */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="leave_days"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Leave Days
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="leave_days"
                name="leave_days"
                value={formikForm.values.leave_days}
                onValueChange={(e) =>
                  formikForm.setFieldValue("leave_days", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={100}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("leave_days") },
                  "w-full text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("leave_days")}
          </div>
          {/* sick_days */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="sick_days"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Sick Days
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="sick_days"
                name="sick_days"
                value={formikForm.values.sick_days}
                onValueChange={(e) =>
                  formikForm.setFieldValue("sick_days", e.value)
                }
                mode="decimal"
                showButtons
                min={0}
                max={100}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("sick_days") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("sick_days")}
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
