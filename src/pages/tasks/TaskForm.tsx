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
import { Editor } from "primereact/editor";
import { Dropdown } from "primereact/dropdown";
import {
  ErrorMessagBox,
  ErrorMessageBox,
  createOptionsFromEnum,
} from "../../utils/utils";
import { AutoComplete } from "primereact/autocomplete";
import { fetchDepartmentsRequest } from "../departments/departmentsApiRequests";
import { fetchDesignationsRequest } from "../designations/designationsApiRequests";
import {
  IPracticeArea,
  fetchPracticeAreasRequest,
} from "../practice-areas/practiceAreasApiRequest";
import { MultiSelect } from "primereact/multiselect";
import { ISector, fetchSectorsRequest } from "../sectors/sectorApiRequest";
import { ITaskPriority, ITaskStatus, ITasks } from "./taskApiRequest";
import { InputTextarea } from "primereact/inputtextarea";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  task_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Task name is Required"),
  task_id: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Task id is Required"),
  task_type: Yup.string(),
  comments: Yup.string(),
  due_date: Yup.string(),
  assignee: Yup.string(),
  status: Yup.string(),
  priority: Yup.string(),
});

export const TaskForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [taskDetails, setStaffDetails] = useState<ITasks>();
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  // useEffect(() => {
  //   if (urlParams.staffId) {
  //     const staffId = urlParams.staffId;
  //     getStaffByIdRequest(staffId).then((response) => {
  //       setStaffDetails(response);
  //     });

  //   }
  // }, [urlParams.staffId]);

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
      ...taskDetails,
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
        // updateStaffRequest(filteredObject, urlParams.staffId);
      } else {
        // addNewStaffRequest(filteredObject).then((res) => {
        //   if (res.response.status === 422) {
        //     setServerErrors({ ...res.response.data });
        //     scrollToElement(targetRef);
        //   }
        //   if (res.response.status === 201) {
        //     navigate("/staff");
        //   }
        // });
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
        {urlParams.taskId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Task
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Task
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
          {/* task_name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="task_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Task Name
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="task_name"
                placeholder="Enter task name"
                value={formikForm.values.task_name}
                onChange={(e) => {
                  formikForm.setFieldValue("task_name", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("task_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("task_name")}
          </div>
          {/* task_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="task_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Task ID
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="task_id"
                placeholder="Enter task id"
                value={formikForm.values.task_id}
                onChange={(e) => {
                  formikForm.setFieldValue("task_id", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("task_id") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("task_id")}
          </div>
          {/* priority*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="priority"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Priority
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={formikForm.values.priority}
                onChange={(e) => {
                  formikForm.setFieldValue("priority", e.target.value);
                }}
                options={createOptionsFromEnum(ITaskPriority)}
                optionLabel="label"
                showClear
                placeholder="Select a priority"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("priority") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("priority")}
          </div>

          {/* assignee */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="assignee"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Assignee
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="assignee"
                placeholder="Enter assignee"
                value={formikForm.values.assignee}
                onChange={(e) => {
                  formikForm.setFieldValue("assignee", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("assignee") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("assignee")}
          </div>

          {/* task_type */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="task_type"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Task Type
            </label>
            <div className="flex flex-col">
              <Dropdown
                value={formikForm.values.task_type}
                onChange={(e) => {
                  formikForm.setFieldValue("task_type", e.target.value);
                }}
                options={createOptionsFromEnum(ITaskPriority)}
                optionLabel="label"
                showClear
                placeholder="Select a task type"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("task_type") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("task_type")}
          </div>
          {/* due_Date*/}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="due_date"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Due Date
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="due_date"
                name="due_date"
                value={
                  formikForm.values.due_date
                    ? new Date(formikForm.values.due_date)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("due_date"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue("due_date", e.target.value);
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("due_date")}
          </div>
          {/* comments */}
          <div className="flex flex-col col-span-3 mb-4 w-full">
            <label
              htmlFor="comments"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Comments
            </label>
            <div className="flex flex-col">
              <Editor
                placeholder={"Enter comments .."}
                value={formikForm.values.comments}
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
            </div>
            {getFormErrorMessage("comments")}
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
