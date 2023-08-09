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
  IMatters,
  addNewMattersRequest,
  getMattersByIdRequest,
  updateMattersRequest,
} from "./matterApiRequest";
import { SelectButton } from "primereact/selectbutton";
import {
  IPracticeArea,
  fetchPracticeAreasRequest,
} from "../../practice-areas/practiceAreasApiRequest";
import { ISector, fetchSectorsRequest } from "../../sectors/sectorApiRequest";
import { IClient } from "../../crm/clients/clientsApiRequests";
import { Calendar } from "primereact/calendar";
import {
  IMattersType,
  fetchMatterTypesRequest,
} from "../matters-type/mattersTypeApiRequests";
import {
  IMattersCategory,
  fetchMatterCategoryRequest,
} from "../matters-category/mattersCategoryApiRequests";
import {
  IOpposingPartyLawyer,
  fetchOpposingPartyLawyersRequest,
} from "../opposing-party-lawyers/opposingPartyLawyerApiRequests";
import {
  IOpposingParty,
  fetchOpposingPartiesRequest,
} from "../opposing-party/opposingPArtyApiRequests";
import {
  IExpenses,
  fetchExpensesRequest,
} from "../expenses/expensesApiRequests";
import {
  IMattersNotes,
  fetchMatterNotesRequest,
} from "../matters-notes/mattersNotesApiRequests";
import {
  IMattersEntries,
  fetchMatterEntriesRequest,
} from "../matters-entries/mattersEntriesApiRequests";
import { IActions } from "../../crm/actions/actionsApiRequests";
import {
  IMattersActions,
  fetchMatterActionsRequest,
} from "../mattersActions/mattersActionsApiRequest";
import {
  IMattersTasks,
  fetchMatterTasksRequest,
} from "../matters-tasks/mattersTasksApiRequests";
import { ICourts, fetchCourtsRequest } from "../courts/courtsApiRequests";

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

export const MattersForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [matterDetails, setMatterDetails] = useState<IMatters>();
  const [filteredPracticeAreas, setFilteredPracticeAreas] = useState(null);
  const [filteredSectors, setFilteredSectors] = useState(null);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState(null);
  const [matterTypes, setMatterTypes] = useState([]);
  const [filteredMatterTypes, setFilteredMatterTypes] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState(null);
  const [matterCategories, setMatterCategories] = useState([]);
  const [filteredMatterCategories, setFilteredMatterCategories] =
    useState(null);
  const [opposingPartyLawyers, setOpposingPartyLawyers] = useState([]);
  const [opposingParties, setOpposingParties] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [entries, setEntries] = useState([]);
  const [actions, setActions] = useState([]);
  const [matterTasks, setMatterTasks] = useState([]);
  const [courts, setCourts] = useState([]);
  const [filteredOpposingPartyLawyers, setFilteredOpposingPartyLawyers] =
    useState(null);
  const [filteredOpposingParties, setFilteredOpposingParties] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState(null);
  const [filteredActions, setFilteredActions] = useState(null);
  const [filteredMatterTasks, setFilteredMatterTasks] = useState(null);
  const [filteredCourts, setFilteredCourts] = useState(null);
  const urlParams = useParams();

  const [serverErrors, setServerErrors] = useState();

  useEffect(() => {
    if (urlParams.matterId) {
      const matterId = urlParams.matterId;
      getMattersByIdRequest(matterId).then((response) => {
        setMatterDetails(response);
      });
    }
  }, [urlParams.matterId]);

  useEffect(() => {
    fetchPracticeAreasRequest().then((response) => {
      setPracticeAreas(response);
    });
    fetchSectorsRequest().then((response) => {
      setSectors(response);
    });
    fetchStaffRequest().then((response) => {
      setStaffList(response);
    });
    fetchMatterCategoryRequest().then((response) => {
      setMatterCategories(response);
    });
    fetchMatterActionsRequest().then((response) => {
      setActions(response);
    });
    fetchOpposingPartiesRequest().then((response) => {
      setOpposingParties(response);
    });
    fetchOpposingPartyLawyersRequest().then((response) => {
      setOpposingPartyLawyers(response);
    });
    fetchMatterNotesRequest().then((response) => {
      setNotes(response);
    });
    fetchMatterTasksRequest().then((response) => {
      setMatterTasks(response);
    });
    fetchMatterTypesRequest().then((response) => {
      searchMatterTypes(response);
    });
    fetchMatterEntriesRequest().then((response) => {
      setEntries(response);
    });
    fetchExpensesRequest().then((response) => {
      setExpenses(response);
    });
    fetchCourtsRequest().then((response) => {
      setCourts(response);
    });
  }, []);

  const titleTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const matterTypesTemplate = (item) => {
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

  const clientTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.client_name}</div>
      </div>
    );
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

  const searchClients = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredClients;

      if (!event.query.trim().length) {
        _filteredClients = [...clients];
      } else {
        _filteredClients = clients.filter((country: IClient) => {
          return country.client_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredClients(_filteredClients);
    }, 250);
  };

  const searchOpposingPartyLawyers = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredOpposingPartyLawyers;

      if (!event.query.trim().length) {
        _filteredOpposingPartyLawyers = [...opposingPartyLawyers];
      } else {
        _filteredOpposingPartyLawyers = opposingPartyLawyers.filter(
          (country: IOpposingPartyLawyer) => {
            return country.first_name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredOpposingPartyLawyers(_filteredOpposingPartyLawyers);
    }, 250);
  };
  const searchOpposingParties = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredOpposingParties;

      if (!event.query.trim().length) {
        _filteredOpposingParties = [...opposingParties];
      } else {
        _filteredOpposingParties = opposingParties.filter(
          (country: IOpposingParty) => {
            return country.first_name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredOpposingParties(_filteredOpposingParties);
    }, 250);
  };
  const searchExpenses = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredExpenses;

      if (!event.query.trim().length) {
        _filteredExpenses = [...expenses];
      } else {
        _filteredExpenses = expenses.filter((country: IExpenses) => {
          return country.expense_code_id
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredExpenses(_filteredExpenses);
    }, 250);
  };
  const searchNotes = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredNotes;

      if (!event.query.trim().length) {
        _filteredNotes = [...notes];
      } else {
        _filteredNotes = notes.filter((country: IMattersNotes) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredNotes(_filteredNotes);
    }, 250);
  };
  const searchEntries = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredEntries;

      if (!event.query.trim().length) {
        _filteredEntries = [...entries];
      } else {
        _filteredEntries = entries.filter((country: IMattersEntries) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredEntries(_filteredEntries);
    }, 250);
  };
  const searchActions = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredActions;

      if (!event.query.trim().length) {
        _filteredActions = [...actions];
      } else {
        _filteredActions = actions.filter((country: IMattersActions) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredActions(_filteredActions);
    }, 250);
  };
  const searchMatterTasks = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredMatterTasks;

      if (!event.query.trim().length) {
        _filteredMatterTasks = [...matterTasks];
      } else {
        _filteredMatterTasks = matterTasks.filter((country: IMattersTasks) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredMatterTasks(_filteredMatterTasks);
    }, 250);
  };
  const searchCourts = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCourts;

      if (!event.query.trim().length) {
        _filteredCourts = [...courts];
      } else {
        _filteredCourts = courts.filter((country: ICourts) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCourts(_filteredCourts);
    }, 250);
  };
  const searchMatterCategories = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredMatterCategories;

      if (!event.query.trim().length) {
        _filteredMatterCategories = [...matterCategories];
      } else {
        _filteredMatterCategories = matterCategories.filter(
          (country: IMattersCategory) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredMatterCategories(_filteredMatterCategories);
    }, 250);
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

  const searchMatterTypes = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredMatterTypes;

      if (!event.query.trim().length) {
        _filteredMatterTypes = [...matterTypes];
      } else {
        _filteredMatterTypes = matterTypes.filter((country: IMattersType) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredMatterTypes(_filteredMatterTypes);
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

  const designationTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };
  const formikForm = useFormik({
    initialValues: {
      ...matterDetails,
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

      if (urlParams.matterId) {
        updateMattersRequest(filteredObject, urlParams.matterId);
      } else {
        addNewMattersRequest(filteredObject).then((res) => {
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
        {urlParams.matterId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Matter
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Matter
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
          {/* reference_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="reference_number"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Reference Number
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="reference_number"
                placeholder="Enter reference number"
                value={formikForm.values.reference_number}
                onChange={(e) => {
                  formikForm.setFieldValue("reference_number", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("reference_number") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("reference_number")}
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
              <AutoComplete
                itemTemplate={clientTemplate}
                value={formikForm.values.department}
                onChange={(e) => {
                  formikForm.setFieldValue("client", e.target.value);
                }}
                suggestions={filteredClients}
                completeMethod={searchClients}
                placeholder="Select a client"
                field="name"
                dropdown
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("client") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("client")}
          </div>
          {/* date_of_engagement */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="date_of_engagement"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Date of Engagement
            </label>
            <div className="flex flex-col">
              <Calendar
                inputId="date_of_engagement"
                name="date_of_engagement"
                value={
                  formikForm.values.date_of_engagement
                    ? new Date(formikForm.values.date_of_engagement)
                    : null
                }
                className={classNames({
                  "p-invalid": isFormFieldInvalid("date_of_engagement"),
                })}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "date_of_engagement",
                    e.target.value
                  );
                }}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
            {getFormErrorMessage("date_of_engagement")}
          </div>

          {/* authourized_representative */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="authourized_representative"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Authorized Representative
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="authourized_representative"
                placeholder="Enter authorized representative"
                value={formikForm.values.authourized_representative}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "authourized_representative",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "authourized_representative"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("authourized_representative")}
          </div>
          {/* authourized_representative_email */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="authourized_representative_email"
              className="font-medium text-left mb-3 text-gray-500 "
            >
              Authorized Representative Email
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="authourized_representative_email"
                placeholder="Enter authorized representative's email"
                value={formikForm.values.authourized_representative_email}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "authourized_representative_email",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "authourized_representative_email"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("authourized_representative_email")}
          </div>
          {/* authourized_representative_phone */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="authourized_representative_phone"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Authorized Representative Phone
            </label>
            <div className="flex flex-col">
              <InputText
                type="email"
                name="authourized_representative_phone"
                placeholder="Enter  authorized representative's phone"
                value={formikForm.values.authourized_representative_phone}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "authourized_representative_phone",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "authourized_representative_phone"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("authourized_representative_phone")}
          </div>

          {/* brief */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="brief"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Brief
            </label>
            <div className="flex flex-col">
              <InputTextarea
                name="brief"
                placeholder="Enter matter brief"
                value={formikForm.values.brief}
                onChange={(e) => {
                  formikForm.setFieldValue("brief", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("brief") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("brief")}
          </div>
          {/* fee */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="fee"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Fee
            </label>
            <div className="flex flex-col">
              <InputNumber
                inputId="fee"
                name="fee"
                value={formikForm.values.fee}
                onValueChange={(e) => formikForm.setFieldValue("fee", e.value)}
                mode="decimal"
                showButtons
                min={0}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("fee") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("fee")}
          </div>
          {/* types */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="types"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Matter Types
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.types}
                onChange={(e) => {
                  formikForm.setFieldValue("types", e.target.value);
                }}
                suggestions={filteredMatterTypes}
                completeMethod={searchMatterTypes}
                multiple
                field="name"
                dropdown
                itemTemplate={matterTypesTemplate}
                placeholder="Select a matter type"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("types") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("types")}
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
          {/* supervising_partners */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="supervising_partners"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Supervising partners
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
            {getFormErrorMessage("supervising_partners")}
          </div>

          {/* associates */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="associates"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Associates
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.associates}
                onChange={(e) => {
                  formikForm.setFieldValue("associates", e.target.value);
                }}
                suggestions={filteredStaff}
                completeMethod={searchStaffs}
                multiple
                field="first_name"
                dropdown
                itemTemplate={staffTemplate}
                placeholder="Select associates"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("associates") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("associates")}
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
                completeMethod={searchMatterCategories}
                field="title"
                dropdown
                multiple
                suggestions={filteredMatterCategories}
                itemTemplate={matterTypesTemplate}
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
                completeMethod={searchOpposingParties}
                field="first_name"
                dropdown
                multiple
                suggestions={filteredOpposingParties}
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
          {/* opposing_party_lawyers */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="opposing_party_lawyers"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Opposing Party Lawyers
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.opposing_party_lawyers}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "opposing_party_lawyers",
                    e.target.value
                  );
                }}
                completeMethod={searchOpposingPartyLawyers}
                field="first_name"
                dropdown
                multiple
                suggestions={filteredOpposingPartyLawyers}
                itemTemplate={staffTemplate}
                placeholder="Select opposing party lawyer"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("opposing_party_lawyers") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("opposing_party_lawyers")}
          </div>

          {/* assistance_required_from_partners */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="assistance_required_from_partners"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Assistance required from partners
            </label>
            <div className="flex flex-col">
              <InputTextarea
                name="assistance_required_from_partners"
                placeholder="Enter assistance required from partners"
                value={formikForm.values.assistance_required_from_partners}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "assistance_required_from_partners",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "assistance_required_from_partners"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("assistance_required_from_partners")}
          </div>
          {/* special_observations_remarks */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="special_observations_remarks"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Special observation remarks
            </label>
            <div className="flex flex-col">
              <InputTextarea
                name="special_observations_remarks"
                placeholder="Enter special observations remarks"
                value={formikForm.values.special_observations_remarks}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "special_observations_remarks",
                    e.target.value
                  );
                }}
                className={classNames(
                  {
                    "p-invalid": isFormFieldInvalid(
                      "special_observations_remarks"
                    ),
                  },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("special_observations_remarks")}
          </div>

          {/* expenses */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="expenses"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Expenses
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.expenses}
                onChange={(e) => {
                  formikForm.setFieldValue("expenses", e.target.value);
                }}
                completeMethod={searchExpenses}
                field="title"
                dropdown
                multiple
                suggestions={filteredExpenses}
                itemTemplate={matterTypesTemplate}
                placeholder="Select expenses"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("expenses") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("expenses")}
          </div>

          {/* notes */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="notes"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Notes
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.notes}
                onChange={(e) => {
                  formikForm.setFieldValue("notes", e.target.value);
                }}
                completeMethod={searchNotes}
                field="title"
                dropdown
                multiple
                suggestions={filteredNotes}
                itemTemplate={titleTemplate}
                placeholder="Select notes"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("notes") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("notes")}
          </div>

          {/* entries */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="entries"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Matter entries
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.entries}
                onChange={(e) => {
                  formikForm.setFieldValue("entries", e.target.value);
                }}
                completeMethod={searchEntries}
                field="title"
                dropdown
                multiple
                suggestions={filteredEntries}
                itemTemplate={titleTemplate}
                placeholder="Select matter entries"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("entries") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("entries")}
          </div>

          {/* tasks */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="tasks"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Matter Tasks
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.tasks}
                onChange={(e) => {
                  formikForm.setFieldValue("tasks", e.target.value);
                }}
                completeMethod={searchMatterTasks}
                field="title"
                dropdown
                multiple
                suggestions={filteredMatterTasks}
                itemTemplate={titleTemplate}
                placeholder="Select tasks"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("tasks") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("tasks")}
          </div>

          {/* actions */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="actions"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Matter Actions
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.actions}
                onChange={(e) => {
                  formikForm.setFieldValue("actions", e.target.value);
                }}
                completeMethod={searchActions}
                field="title"
                dropdown
                multiple
                suggestions={filteredActions}
                itemTemplate={titleTemplate}
                placeholder="Select actions"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("actions") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("actions")}
          </div>

          {/* courts */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="courts"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Courts
            </label>
            <div className="flex flex-col">
              <AutoComplete
                value={formikForm.values.courts}
                onChange={(e) => {
                  formikForm.setFieldValue("courts", e.target.value);
                }}
                completeMethod={searchCourts}
                field="name"
                dropdown
                multiple
                suggestions={filteredCourts}
                itemTemplate={matterTypesTemplate}
                placeholder="Select court"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("courts") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("courts")}
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
