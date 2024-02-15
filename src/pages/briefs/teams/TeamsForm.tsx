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
import {
  ITeam,
  addNewTeamRequest,
  getTeamByIdRequest,
  updateTeamRequest,
} from "./teamsApiRequests";
import { AutoComplete } from "primereact/autocomplete";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  litigation_id: Yup.string(),
  name: Yup.string(),
});

export const TeamsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [teamDetails, setTeamDetails] = useState<ITeam>();
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
    if (urlParams.teamId) {
      const teamId = urlParams.teamId;
      getTeamByIdRequest(teamId).then((response) => {
        setTeamDetails(response);
      });
    }
  }, [urlParams.teamId]);

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
      ...teamDetails,
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

      if (urlParams.teamId) {
        updateTeamRequest(filteredObject, urlParams.teamId);
      } else {
        addNewTeamRequest(filteredObject).then((res) => {
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
        {urlParams.teamId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Team
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Team
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
              Team Name
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
