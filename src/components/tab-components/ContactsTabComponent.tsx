import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ConsultationCard } from "../cards/consultation-card/ConsultationCard";
import { ContactCard } from "../cards/contact-card/ContactCard";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

export const ContactsTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [primaryMobileNumber, setPrimaryMobileNumber] = useState("");
  const [salutation, setSalutation] = useState("");
  return (
    <div className="w-full bg-gray-100 border-none p-4">
      <div className="flex justify-end mb-4">
        <Button
          icon="pi pi-plus"
          label="New"
          outlined
          onClick={() => setVisible(true)}
        />
      </div>
      <ContactCard handleEditClick={() => setVisible(true)} />
      <br />
      <ContactCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Contact `}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full grid grid-cols-2 gap-3 space-y-2">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>
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
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
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
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                showIcon
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>
          {/* primary_mobile_number */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="primary_mobile_number"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Primary Cellphone
            </label>
            <div className="flex flex-col">
              <InputText
                type="text"
                name="primary_mobile_number"
                placeholder="Enter primary phone number"
                value={primaryMobileNumber}
                onChange={(e) => setPrimaryMobileNumber(e.target.value)}
                className="w-full p-1 ml-3 text-gray-500 outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-3">
          <Button label="Save" className="h-12 w-24" />
          <Button label="Close" severity="danger" className="h-12 w-24" />
        </div>
      </Dialog>
    </div>
  );
};
