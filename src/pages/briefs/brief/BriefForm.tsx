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
  IBriefs,
  addNewBriefsRequest,
  getBriefsByIdRequest,
  updateBriefsRequest,
} from "./briefApiRequest";
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

export const BriefsForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [briefDetails, setBriefDetails] = useState<IBriefs>();
  const [filteredPracticeAreas, setFilteredPracticeAreas] = useState(null);
  const [filteredSectors, setFilteredSectors] = useState(null);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState(null);
  const [briefTypes, setBriefTypes] = useState([]);
  const [filteredBriefTypes, setFilteredBriefTypes] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState(null);
  const [briefCategories, setBriefCategories] = useState([]);
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
  const detsl = {
    id: "brief1",
    reference_number: "123ABC",
    brief: "Lorem ipsum dolor sit amet...",
    client_id: "client1",
    authourized_representative: "John Doe",
    authourized_representative_email: "john@email.com",
    authourized_representative_phone: "1234567890",
    date_of_engagement: "2023-01-01",
    status: "Active",
    assistance_required_from_partners: "Research support",
    special_observations_remarks: "N/A",
    fee: 1000,
    creator_id: "user1",
    updator_id: "user2",
    client: {
      /*...client1 data...*/
    },
    created_by: {
      /*...user1 data...*/
    },
    updated_by: {
      /*...user2 data...*/
    },
    staffs: [
      {
        /*...staff data...*/
      },
    ],
    supervising_partners: [
      {
        /*...partner data...*/
      },
    ],
    associates: [
      {
        /*...associate data...*/
      },
    ],
    sectors: [
      {
        /*...sector data...*/
      },
    ],
    practice_areas: [
      {
        /*...practice area data...*/
      },
    ],
    categories: [
      {
        /*...category data...*/
      },
    ],
    types: [
      {
        /*...type data...*/
      },
    ],
    opposing_party_lawyers: [
      {
        /*...lawyer data...*/
      },
    ],
    opposing_parties: [
      {
        /*...party data...*/
      },
    ],
    expenses: [
      {
        /*...expense data...*/
      },
    ],
    notes: [
      {
        /*...note data...*/
      },
    ],
    entries: [
      {
        /*...entry data...*/
      },
    ],
    actions: [
      {
        /*...action data...*/
      },
    ],
    brief_tasks: [
      {
        /*...task data...*/
      },
    ],
    courts: [
      {
        /*...court data...*/
      },
    ],
    cases: [
      {
        /*...case data...*/
      },
    ],
  };

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
      label: "Litigation",
      value: "dfkf",
    },
    { label: "Non Litigation", value: "dhfjh" },
  ];
  const getFromLocalClients = JSON.parse(localStorage.getItem("dummyClients"));
  const getFromLocalMAtterTypes = JSON.parse(
    localStorage.getItem("dummyBriefType")
  );

  useEffect(() => {
    if (urlParams.briefId) {
      const briefId = urlParams.briefId;
      getBriefsByIdRequest(briefId).then((response) => {
        setBriefDetails(response);
      });
    }
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
        _filteredBriefCategories = [...briefCategories];
      } else {
        _filteredBriefCategories = briefCategories.filter(
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
        _filteredBriefTypes = [...briefTypes];
      } else {
        _filteredBriefTypes = briefTypes.filter((country: IBriefsType) => {
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
            Edit Brief
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Brief
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
              Brief Types
            </label>
            <div className="flex flex-col">
              <DropdownWithCreate
                optionLabel="label"
                optionValue="value"
                value={formikForm.values.types}
                onChange={(e) => {
                  formikForm.setFieldValue("types", e.target.value);
                }}
                placeholder="Select a brief type"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("types") },
                  "w-full  text-gray-500 outline-none"
                )}
                options={getFromLocalMAtterTypes}
                inputName="brief type"
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

          {/* expenses */}
        </div>

        <Accordion activeIndex={0} className="w-full grid grid-cols-2 gap-4">
          {/* background*/}

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

          {/* assistance_required_from_partners */}
          <AccordionTab header="Assistance required from partners">
            <Editor
              placeholder={"Enter Assistance required from partners ..."}
              value={formikForm.values.assistance_required_from_partners}
              onTextChange={(e) =>
                formikForm.setFieldValue(
                  "assistance_required_from_partners",
                  e.htmlValue
                )
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

          {/* special_observations_remarks */}
          <AccordionTab header="Special observation remarks">
            <Editor
              placeholder={"Enter Special observation remarks ..."}
              value={formikForm.values.special_observations_remarks}
              onTextChange={(e) =>
                formikForm.setFieldValue(
                  "special_observations_remarks",
                  e.htmlValue
                )
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
