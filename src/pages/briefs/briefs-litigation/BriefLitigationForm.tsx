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

import { IStaff, fetchStaffRequest } from "../../staff/staffApiRequests";
import { AutoComplete } from "primereact/autocomplete";

import {
  IPracticeArea,
  fetchPracticeAreasRequest,
} from "../../practice-areas/practiceAreasApiRequest";
import { ISector, fetchSectorsRequest } from "../../sectors/sectorApiRequest";
import { IClient } from "../../crm/clients/clientsApiRequests";
import { Calendar } from "primereact/calendar";
import {
  IBriefsType,
  fetchBriefTypesRequest,
} from "../briefs-type/briefsTypeApiRequests";
import {
  IBriefsCategory,
  fetchBriefCategoryRequest,
} from "../briefs-category/briefsCategoryApiRequests";
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
  IBriefsNotes,
  fetchBriefNotesRequest,
} from "../briefs-notes/briefsNotesApiRequests";
import { Editor } from "primereact/editor";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { DropdownWithCreate } from "../../../components/autocomplete-with-create/AutoCompleteWithCreate";
import {
  IBriefs,
  getBriefsByIdRequest,
  updateBriefsRequest,
  addNewBriefsRequest,
} from "../brief/briefApiRequest";

const scrollToElement = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const SignupSchema = Yup.object().shape({
  title: Yup.string().required(),
  brief: Yup.mixed(),
  suite_number: Yup.string(),
  client: Yup.mixed(),
  lawyer: Yup.mixed(),
  start_date: Yup.string(),
  end_date: Yup.string(),
  litigation_category: Yup.mixed(),
  staffs: Yup.mixed(),
  courts: Yup.mixed(),
  hearings: Yup.mixed(),
  categories: Yup.mixed(),
  opposing_parties: Yup.mixed(),
  description: Yup.string(),
  background: Yup.string(),
});

const dummyData = {
  title: "Legal Case XYZ",
  brief: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  suite_number: "Suite 123",
  client: {
    name: "John Doe",
    contact: "john.doe@example.com",
  },
  lawyer: {
    name: "Jane Smith",
    contact: "jane.smith@example.com",
  },
  start_date: "2024-01-01",
  end_date: "2024-02-01",
  litigation_category: "Civil",
  staffs: [
    { name: "Alice Johnson", role: "Paralegal" },
    { name: "Bob Davis", role: "Associate" },
  ],
  courts: [
    { name: "Supreme Court", location: "City Center" },
    { name: "District Court", location: "Downtown" },
  ],
  hearings: [
    { date: "2024-01-10", time: "09:00 AM", location: "Courtroom A" },
    { date: "2024-01-20", time: "02:00 PM", location: "Courtroom B" },
  ],
  categories: ["Contracts", "Intellectual Property"],
  opposing_parties: [
    { name: "XYZ Corporation", attorney: "John Smith" },
    { name: "ABC Ltd", attorney: "Alice Johnson" },
  ],
  description: "This is a detailed description of the legal case.",
  background: "Background information about the case and parties involved.",
};

// You can use this dummy data to test your Yup validation schema
// SignupSchema.validate(dummyData)
//   .then((validData) => console.log("Validation passed:", validData))
//   .catch((error) => console.error("Validation failed:", error));

export const BriefsLitigationForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [litigationDetails, setBriefDetails] = useState<any>();
  const [filteredPracticeAreas, setFilteredPracticeAreas] = useState(null);
  const [filteredSectors, setFilteredSectors] = useState(null);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState(null);
  const [litigationTypes, setBriefTypes] = useState([]);
  const [filteredBriefTypes, setFilteredBriefTypes] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState(null);
  const [litigationCategories, setBriefCategories] = useState([]);
  const [filteredBriefCategories, setFilteredBriefCategories] = useState(null);
  const [opposingPartyLawyers, setOpposingPartyLawyers] = useState([]);
  const [opposingParties, setOpposingParties] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filteredOpposingPartyLawyers, setFilteredOpposingPartyLawyers] =
    useState(null);
  const [filteredOpposingParties, setFilteredOpposingParties] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState(null);
  const urlParams = useParams();

  const [showClientDialog, setShowCLientDialog] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newRegNumber, setNewRegNumber] = useState("");
  const [showBriefTypesDialog, setShowBriefTypesDialog] = useState(false);
  const [newBriefType, setNewBriefType] = useState("");

  const [serverErrors, setServerErrors] = useState();
  const dummyClients = [
    {
      label: "John Doe",
      value: "John Doe",
    },
    {
      label: "James Dean",
      value: "James Dean",
    },
  ];

  const dummyBriefType = [
    {
      label: "Domestic violence",
      value: "dfkf",
    },
    { label: "Arson", value: "dhfjh" },
  ];
  const getFromLocalClients = JSON.parse(localStorage.getItem("dummyClients"));
  const getFromLocalMAtterTypes = JSON.parse(
    localStorage.getItem("dummyBriefType")
  );

  useEffect(() => {
    // if (urlParams.briefsLitigationId) {
    //   const briefsLitigationId = urlParams.briefsLitigationId;
    //   getBriefsByIdRequest(briefsLitigationId).then((response) => {
    //     setBriefDetails(response);
    //   });
    // }
    // setBriefDetails(dummyData);
  }, [urlParams.briefId]);

  useEffect(() => {
    localStorage.setItem("dummyClients", JSON.stringify(dummyClients));
    localStorage.setItem("dummyBriefType", JSON.stringify(dummyBriefType));

    fetchPracticeAreasRequest().then((response) => {
      setPracticeAreas(response);
    });
    fetchSectorsRequest().then((response) => {
      setSectors(response);
    });
    fetchStaffRequest().then((response) => {
      setStaffList(response);
    });
    fetchBriefCategoryRequest().then((response) => {
      setBriefCategories(response);
    });

    fetchOpposingPartiesRequest().then((response) => {
      setOpposingParties(response);
    });
    fetchOpposingPartyLawyersRequest().then((response) => {
      setOpposingPartyLawyers(response);
    });
    fetchBriefNotesRequest().then((response) => {
      setNotes(response);
    });

    fetchBriefTypesRequest().then((response) => {
      searchBriefTypes(response);
    });

    fetchExpensesRequest().then((response) => {
      setExpenses(response);
    });
  }, []);

  const titleTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };

  const briefTypesTemplate = (item) => {
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
        <div>{item.label}</div>

        {/* <div>{item.client_name}</div> */}
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
            return country.name
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
        _filteredNotes = notes.filter((country: IBriefsNotes) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredNotes(_filteredNotes);
    }, 250);
  };

  const searchBriefCategories = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredBriefCategories;

      if (!event.query.trim().length) {
        _filteredBriefCategories = [...litigationCategories];
      } else {
        _filteredBriefCategories = litigationCategories.filter(
          (country: IBriefsCategory) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredBriefCategories(_filteredBriefCategories);
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

  const searchBriefTypes = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredBriefTypes;

      if (!event.query.trim().length) {
        _filteredBriefTypes = [...litigationTypes];
      } else {
        _filteredBriefTypes = litigationTypes.filter((country: IBriefsType) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredBriefTypes(_filteredBriefTypes);
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
      ...litigationDetails,
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
        updateBriefsRequest(filteredObject, urlParams.briefId);
      } else {
        addNewBriefsRequest(filteredObject).then((res) => {
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

  const createNewClient = () => {
    const dummyArray = JSON.parse(localStorage.getItem("dummyClients"));
    console.log(dummyArray);

    dummyArray.push({
      label: newClientName,
      value: newClientName,
    });
    localStorage.setItem("dummyClients", JSON.stringify(dummyArray));
    setShowCLientDialog(false);
  };

  const emptyMAtterTypeComponent = () => {
    return (
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl text-gray-500 font-semibold">No Type Found</h2>
        <Button icon="pi pi-plus" onClick={() => setShowCLientDialog(true)} />
      </div>
    );
  };

  const createNewType = () => {
    const dummyArray = JSON.parse(localStorage.getItem("dummyBriefType"));

    dummyArray.push({
      label: newBriefType,
      value: newBriefType,
    });
    localStorage.setItem("dummyBriefType", JSON.stringify(dummyArray));
    setShowBriefTypesDialog(false);
  };
  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.briefId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Litigation
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Litigation
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
          {/* title */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Title
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="title"
                placeholder="Enter title"
                value={formikForm.values.title}
                onChange={(e) => {
                  formikForm.setFieldValue("title", e.target.value);
                }}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("title") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("title")}
          </div>
          {/* brief_id */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="brief_id"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Select Brief
            </label>
            <div className="flex flex-col">
              <DropdownWithCreate
                optionLabel="label"
                optionValue="value"
                value={formikForm.values.brief}
                onChange={(e) => {
                  formikForm.setFieldValue("brief", e.target.value);
                }}
                placeholder="Select a brief"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("brief") },
                  "w-full  text-gray-500 outline-none"
                )}
                options={getFromLocalClients}
                inputName="brief"
                onButtonClick={() => setShowCLientDialog(true)}
              />

              {/* <AutoComplete
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
                emptyMessage="nothing"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("client") },
                  "w-full  text-gray-500 outline-none"
                )}
              /> */}
            </div>
            {getFormErrorMessage("brief")}
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
                options={getFromLocalClients}
                inputName="client"
                onButtonClick={() => setShowCLientDialog(true)}
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
                value={formikForm.values.lawyer}
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
                  { "p-invalid": isFormFieldInvalid("lawyer") },
                  "w-full  text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("lawyer")}
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

          {/* litigation_category */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="types"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Litigation category
            </label>
            <div className="flex flex-col">
              <DropdownWithCreate
                optionLabel="label"
                optionValue="value"
                value={formikForm.values.types}
                onChange={(e) => {
                  formikForm.setFieldValue(
                    "litigation_category",
                    e.target.value
                  );
                }}
                placeholder="Select a brief type"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("litigation_category") },
                  "w-full  text-gray-500 outline-none"
                )}
                options={getFromLocalMAtterTypes}
                inputName="litigation_category"
                onButtonClick={() => setShowBriefTypesDialog(true)}
              />

              {/* <AutoComplete
                value={formikForm.values.types}
                onChange={(e) => {
                  formikForm.setFieldValue("types", e.target.value);
                }}
                suggestions={filteredBriefTypes}
                completeMethod={searchBriefTypes}
                multiple
                field="name"
                dropdown
                itemTemplate={briefTypesTemplate}
                placeholder="Select a brief type"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("types") },
                  "w-full  text-gray-500 outline-none"
                )}
              /> */}
            </div>
            {getFormErrorMessage("litigation_category")}
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
                completeMethod={searchBriefCategories}
                field="title"
                dropdown
                multiple
                suggestions={filteredBriefCategories}
                itemTemplate={briefTypesTemplate}
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
          {/* notes*/}

          {/* <AccordionTab header="Note">
            <Editor
              placeholder={"Enter note .."}
              value={formikForm.values.notes}
              onTextChange={(e) =>
                formikForm.setFieldValue("notes", e.htmlValue)
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
            */}
        </Accordion>
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

      <Dialog
        header="New Client"
        visible={showClientDialog}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setShowCLientDialog(false)}
      >
        <form>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Client Name
            </label>
            <div className="flex flex-col">
              <InputText
                id="name"
                name="name"
                type="text"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("name") },
                  "w-full  text-gray-500 outline-none"
                )}
                value={newClientName}
                onChange={(e) => {
                  setNewClientName(e.target.value);
                }}
              />
              {getFormErrorMessage("name")}
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Registration Number
            </label>
            <div className="flex flex-col">
              <InputText
                id="name"
                name="newRegNumber"
                type="text"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("newRegNumber") },
                  "w-full  text-gray-500 outline-none"
                )}
                value={newRegNumber}
                onChange={(e) => {
                  setNewRegNumber(e.target.value);
                }}
              />
              {getFormErrorMessage("name")}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              label="Close"
              icon="pi pi-times"
              severity="danger"
              className={style({
                marginRight: "1rem",
              })}
              onClick={() => setShowCLientDialog(false)}
            />
            <Button
              label="Save"
              type="button"
              icon="pi pi-save"
              onClick={createNewClient}
            />
          </div>
        </form>
      </Dialog>

      <Dialog
        header="New Brief Type"
        visible={showBriefTypesDialog}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setShowBriefTypesDialog(false)}
      >
        <form>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Type Name
            </label>
            <div className="flex flex-col">
              <InputText
                id="name"
                name="name"
                type="text"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("name") },
                  "w-full  text-gray-500 outline-none"
                )}
                value={newBriefType}
                onChange={(e) => {
                  setNewBriefType(e.target.value);
                }}
              />
              {getFormErrorMessage("name")}
            </div>
          </div>
          {/* <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Registration Number
            </label>
            <div className="flex flex-col">
              <InputText
                id="name"
                name="newRegNumber"
                type="text"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("newRegNumber") },
                  "w-full  text-gray-500 outline-none"
                )}
                value={newRegNumber}
                onChange={(e) => {
                  setNewRegNumber(e.target.value);
                }}
              />
              {getFormErrorMessage("name")}
            </div>
          </div> */}
          <div className="w-full flex justify-end">
            <Button
              label="Close"
              icon="pi pi-times"
              severity="danger"
              className={style({
                marginRight: "1rem",
              })}
              onClick={() => setShowBriefTypesDialog(false)}
            />
            <Button
              label="Save"
              type="button"
              icon="pi pi-save"
              onClick={createNewType}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};
