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
import { FormField } from "../../../utils/FormField";
import {
  IBriefPayment,
  addNewBriefPaymentRequest,
  getBriefPaymentByIdRequest,
  updateBriefPaymentRequest,
} from "../brief-payment/BriefPaymentApiREquest";

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

export const BriefsExpenseForm = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [briefDetails, setBriefDetails] = useState<IBriefPayment>();
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

  useEffect(() => {
    if (urlParams.briefId) {
      const briefId = urlParams.briefId;
      getBriefPaymentByIdRequest(briefId).then((response) => {
        setBriefDetails(response);
      });
    }
  }, [urlParams.briefId]);

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
        updateBriefPaymentRequest(filteredObject, urlParams.briefId);
      } else {
        addNewBriefPaymentRequest(filteredObject).then((res) => {
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

  const createNewType = () => {
    const dummyArray = JSON.parse(localStorage.getItem("dummyBriefType"));

    dummyArray.push({
      label: newBriefType,
      value: newBriefType,
    });
    localStorage.setItem("dummyBriefType", JSON.stringify(dummyArray));
    setShowBriefTypesDialog(false);
  };

  const fields = [
    {
      label: "Select Brief",
      fieldType: "dropdown",
      fieldName: "brief_id",
      formikForm: formikForm,
      placeholder: "Select brief",
    },
    {
      label: "Title",
      fieldType: "text",
      fieldName: "title",
      formikForm: formikForm,
      placeholder: "Enter title",
    },

    {
      label: "Amount",
      fieldType: "number",
      fieldName: "amount",
      formikForm: formikForm,
      placeholder: "Enter amount",
    },
    {
      label: "Currency",
      fieldType: "text",
      fieldName: "currency",
      formikForm: formikForm,
      placeholder: "Enter currency",
    },

    {
      label: "Description ",
      fieldType: "editor",
      fieldName: "description",
      formikForm: formikForm,
      placeholder: "Enter description",
    },
  ];
  return (
    <div className="w-full p-4">
      <div ref={targetRef} className="flex flex-1  items-center p-2">
        {urlParams.briefId ? (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            Edit Brief Expense
          </h1>
        ) : (
          <h1 className="my-4 ml-4 text-4xl text-gray-500 font-semibold">
            New Brief Expense
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
          {fields.map((item, index) => (
            <FormField
              key={index}
              fieldName={item.fieldName}
              fieldType={item.fieldType}
              formikForm={formikForm}
              label={item.label}
              placeholder={item.placeholder}
            />
          ))}
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
            severity="danger"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
};
