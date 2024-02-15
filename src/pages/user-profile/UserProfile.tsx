import { Avatar } from "primereact/avatar";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { MdLocationOn } from "react-icons/md";
import { Tag } from "primereact/tag";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { UsersForm } from "../users/UsersForm";
import { TabPanel, TabView } from "primereact/tabview";
import { ActionsTabComponent } from "../../components/tab-components/ActionsTabComponent";
import { BriefTabComponent } from "../../components/tab-components/BriefsTabComponent";
import { LitigationTabComponent } from "../../components/tab-components/LitigationTabComponent";
import { ConsultationTabComponent } from "../../components/tab-components/ConsultationTabComponent";
import { NotesTabComponent } from "../../components/tab-components/NotesTabComponent";
import { AppraisalTabComponent } from "../../components/tab-components/AppraisalTabComponent";
import { ClientsTabComponent } from "../../components/tab-components/ClientsTabComponent";
import { LeadsTabComponent } from "../../components/tab-components/LeadsTabComponent";
import { LegalOpinionTabComponent } from "../../components/tab-components/LegalOpinionTab";
import { TasksTabComponent } from "../../components/tab-components/TasksTabComponent";
import { TransactionsTabComponent } from "../../components/tab-components/TransactionsTabComponent";
export const UserProfile = () => {
  const [visibleEditForm, setVisibleEditForm] = useState(false);
  const events = [
    {
      status: "Case Created",
      date: "15/10/2020 10:30",
      icon: "pi pi-bell",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    {
      status: "User Created",
      date: "15/10/2020 14:00",
      icon: "pi pi-bell",
      color: "#673AB7",
    },
    {
      status: "New Evidence",
      date: "15/10/2020 16:15",
      icon: "pi pi-bell",
      color: "#FF9800",
    },
  ];
  const customizedMarker = (item) => {
    return (
      <span
        className="flex p-2 rounded-full w-2rem h-2rem items-center justify-center text-white  z-1 shadow"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };
  const customizedContent = (item) => {
    return (
      <Card title={item.status} subTitle={item.date} className="mb-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
        <Button label="Read more" className="p-button-text"></Button>
      </Card>
    );
  };
  const updatedStaffDetails = {};
  return (
    <div className="p-8">
      <div className="flex justify-between ">
        <span className="text-4xl text-gray-500 font-semibold">
          Staff Profile
        </span>
        <Button
          onClick={() => setVisibleEditForm(true)}
          label="Edit"
          icon="pi pi-plus"
          outlined
        />{" "}
      </div>

      <div>
        <TabView>
          <TabPanel header="Personal Info" leftIcon="pi pi-user mr-2">
            <div className="shadow-lg rounded-md bg-white w-full flex flex-col text-left p-8 space-y-5">
              <Avatar
                icon="pi pi-user"
                style={{ width: "7rem", height: "7rem" }}
              />
              <span className="font-bold text-xl">Jesse Leos</span>
              <div className="grid grid-cols-2 space-y-4">
                <div className="flex flex-row space-x-2 text-md">
                  <PiSuitcaseSimpleFill
                    style={{ alignSelf: "center", fontSize: "1.4rem" }}
                  />
                  <span className="text-slate-400 font-semibold">
                    Junior Attorney
                  </span>
                </div>
                <div className="flex flex-row">
                  <MdLocationOn
                    style={{ alignSelf: "center", fontSize: "1.4rem" }}
                  />
                  <span className="text-slate-400 font-semibold">
                    Accra, Ghana
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-semibold">
                    Email Address
                  </span>
                  <span>jesseleos@mail.com</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-semibold">
                    Home Address
                  </span>
                  <span>53 Ridge Gardens</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-semibold">
                    Phone Number
                  </span>
                  <span>+233 245 678 987</span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Appraisals" leftIcon="fas fa-hands-clapping mr-2">
            <AppraisalTabComponent />
          </TabPanel>
          <TabPanel header="Leaves" leftIcon="pi pi-directions mr-2">
            <div className="w-full font-medium">
              <h2 className="text-left mb-4 text-black text-xl">
                Leave information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-left mb-6">
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">No. of Leave Days</span>

                  <span className="text-black">10</span>
                </div>

                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">No. of Sick Days</span>
                  <span className="text-black">10</span>
                </div>
                {/* 
                <div className="flex flex-col mb-2">
                  <span className="text-[#808080]">Overtime Allowed</span>
                  <span className="text-black capitalize">
                    {updatedStaffDetails?.overtime_allowed.toString()}
                  </span>
                </div> */}
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Clients" leftIcon="pi pi-ticket mr-2">
            <ClientsTabComponent />
          </TabPanel>{" "}
          <TabPanel header="Leads" leftIcon="fas fa-chalkboard-user mr-2">
            <LeadsTabComponent />
          </TabPanel>
          <TabPanel header="Consultations" leftIcon="fas fa-glasses mr-2">
            <ConsultationTabComponent />
          </TabPanel>
          <TabPanel header="Briefs" leftIcon="fas fa-gavel mr-2">
            <BriefTabComponent />
          </TabPanel>
          <TabPanel header="Litigation" leftIcon="fas fa-suitcase mr-2">
            <LitigationTabComponent />
          </TabPanel>
          <TabPanel
            header="Transactions"
            leftIcon="fas fa-money-bill-transfer mr-2"
          >
            <TransactionsTabComponent />
          </TabPanel>
          <TabPanel
            header="Legal opinions"
            leftIcon="fas fa-scale-balanced mr-2"
          >
            <LegalOpinionTabComponent />
          </TabPanel>
          <TabPanel header="Dispatches" leftIcon="pi pi-ticket mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Visits" leftIcon="pi pi-ticket mr-2">
            <NotesTabComponent />
          </TabPanel>
          <TabPanel header="Tasks" leftIcon="pi pi-ticket mr-2">
            <TasksTabComponent />
          </TabPanel>
        </TabView>
      </div>
      {/* <div className="w-full flex space-x-3">
        <div className="w-[40%] space-y-4">
          {" "}
          <div className="shadow-lg rounded-md bg-white w-full flex flex-col text-left p-8 space-y-5">
            <span className="font-bold text-xl">Practice Areas</span>
            <div>
              <Tag className="m-2 profile-tag" value="Commercial Law"></Tag>
              <Tag className="m-2 profile-tag" value="Charity Law"></Tag>
              <Tag
                className="m-2 profile-tag"
                value="Construction Law"
              ></Tag>{" "}
              <Tag className="m-2 profile-tag" value="Criminal Law"></Tag>{" "}
              <Tag className="m-2 profile-tag" value="Family Law"></Tag>{" "}
              <Tag
                className="m-2 profile-tag"
                value="Banking and Debt Finance Law"
              ></Tag>{" "}
              <Tag className="m-2 profile-tag" value="Corporate Law"></Tag>{" "}
              <Tag className="m-2 profile-tag" value="Employment Law"></Tag>{" "}
              <Tag className="m-2 profile-tag" value="Insurance Law"></Tag>
            </div>
          </div>
          <div className="shadow-lg rounded-md bg-white w-full flex flex-col text-left p-8 space-y-5">
            <span className="font-bold text-xl">Sectors</span>
            <div>
              <Tag
                className="m-2 profile-tag-blue"
                value="Commercial Law"
              ></Tag>
              <Tag className="m-2 profile-tag-blue" value="Charity Law"></Tag>
              <Tag
                className="m-2 profile-tag-blue"
                value="Construction Law"
              ></Tag>{" "}
              <Tag className="m-2 profile-tag-blue" value="Criminal Law"></Tag>{" "}
              <Tag className="m-2 profile-tag-blue" value="Family Law"></Tag>{" "}
              <Tag
                className="m-2 profile-tag-blue"
                value="Banking and Debt Finance Law"
              ></Tag>{" "}
              <Tag className="m-2 profile-tag-blue" value="Corporate Law"></Tag>{" "}
              <Tag
                className="m-2 profile-tag-blue"
                value="Employment Law"
              ></Tag>{" "}
              <Tag className="m-2 profile-tag-blue" value="Insurance Law"></Tag>
            </div>
          </div>
        </div>
      </div> */}

      <Sidebar
        visible={visibleEditForm}
        position="right"
        onHide={() => setVisibleEditForm(false)}
        style={{ width: "50%" }}
        className="w-full"
      >
        <UsersForm />
      </Sidebar>
    </div>
  );
};
