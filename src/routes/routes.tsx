import { StaffIndex } from "../pages/staff/StaffIndex";
import { StaffForm1 } from "../pages/staff/StaffForm1";
import { StaffDetails } from "../pages/staff/StaffDetails";
import { DepartmentForm } from "../pages/departments/DepartmentForm";
import { VisitsIndex } from "../pages/front-office/visits/VisitsIndex";
import { VisitForm } from "../pages/front-office/visits/VisitForm";
import { VisitDetails } from "../pages/front-office/visits/VisitDetails";
import { VisitCategoryIndex } from "../pages/front-office/visit-category/VisitCategoryIndex";
import { VisitCategoryDetails } from "../pages/front-office/visit-category/VisitCategoryDetails";
import { VisitCategoryForm } from "../pages/front-office/visit-category/VisitCategoryForm";
import { OfficeAreasIndex } from "../pages/front-office/office-areas/OfficeAreasIndex";
import { OfficeAreasDetails } from "../pages/front-office/office-areas/OfficeAreasDetails";
import { OfficeAreasForm } from "../pages/front-office/office-areas/OfficeAreasForm";
import { VisitStatusIndex } from "../pages/front-office/visit-status/VisitStatusIndex";
import { VisitStatusDetails } from "../pages/front-office/visit-status/VisitStatusDetails";
import { VisitStatusForm } from "../pages/front-office/visit-status/VisitStatusForm";
import { ExpectedVisitorsIndex } from "../pages/front-office/expected-visitors/ExpectedVisitorsIndex";
import { ExpectedVisitorsDetails } from "../pages/front-office/expected-visitors/ExpectedVisitorsDetails";
import { ExpectedVisitorsForm } from "../pages/front-office/expected-visitors/ExpectedVisitorsForm";
import { VisitEntryIndex } from "../pages/front-office/visit-entry/VisitEntryIndex";
import { VisitEntryDetails } from "../pages/front-office/visit-entry/VisitEntryDetails";
import { VisitEntryForm } from "../pages/front-office/visit-entry/VisitEntryForm";
import { DepartmentDetails } from "../pages/departments/DepartmentDetails";
import { PracticeAreasIndex } from "../pages/practice-areas/PracticeAreasIndex";
import { PracticeAreasForm } from "../pages/practice-areas/PracticeAreasForm";
import { PracticeAreasDetails } from "../pages/practice-areas/PracticeAreasDetails";
import { DepartmentsIndex } from "../pages/departments/DepartmentsIndex";
import { SectorsIndex } from "../pages/sectors/SectorsIndex";
import { SectorDetails } from "../pages/sectors/SectorDetails";
import { SectorsForm } from "../pages/sectors/SectorsForm";
import { DesignationsIndex } from "../pages/designations/DesignationsIndex";
import { DesignationDetails } from "../pages/designations/DesignationDetails";
import { DesignationsForm } from "../pages/designations/DesignationsForm";
import { LayoutWithSubMenu } from "../layout/LayoutWithSubMenu";
import { IncomingDispatchesIndex } from "../pages/front-office/dispatches/incoming-dispatches/IncomingDispatchesIndex";
import { IncomingDispatchDetails } from "../pages/front-office/dispatches/incoming-dispatches/IncomingDispatchesDetails";
import { IncomingDispatchForm } from "../pages/front-office/dispatches/incoming-dispatches/IncomingDispatchesForm";
import { OutgoingDispatchesIndex } from "../pages/front-office/dispatches/outgoing-dispatches/OutgoingDispatchesIndex";
import { OutgoingDispatchDetails } from "../pages/front-office/dispatches/outgoing-dispatches/OutgoingDispatchesDetails";
import { OutgoingDispatchForm } from "../pages/front-office/dispatches/outgoing-dispatches/OutgoingDispatchesForm";
import { DashboardView } from "../pages/dashboard/DashboardView";
import { StaffTargetsIndex } from "../pages/appraisal/staff-target/StaffTargetIndex";
import { StaffTargetDetails } from "../pages/appraisal/staff-target/StaffTargetDetails";
import { StaffTargetForm } from "../pages/appraisal/staff-target/StaffTargetForm";
import { DepartmentTargetsIndex } from "../pages/appraisal/department-target/DepartmentTargetIndex";
import { DepartmentTargetDetails } from "../pages/appraisal/department-target/DepartmentTargetDetails";
import { DepartmentTargetForm } from "../pages/appraisal/department-target/DepartmentTargetForm";
import { FirmTargetsIndex } from "../pages/appraisal/firm-target/FirmTargetIndex";
import { FirmTargetDetails } from "../pages/appraisal/firm-target/FirmTargetDetails";
import { FirmTargetForm } from "../pages/appraisal/firm-target/FirmTargetForm";
import { ReviewPeriodIndex } from "../pages/appraisal/review-period/ReviewPeriodIndex";
import { ReviewPeriodDetails } from "../pages/appraisal/review-period/ReviewPeriodDetails";
import { ReviewPeriodForm } from "../pages/appraisal/review-period/ReviewPeriodForm";
import { LeadsIndex } from "../pages/crm/leads/LeadsIndex";
import { LeadDetails } from "../pages/crm/leads/LeadsDetails";
import { LeadsForm } from "../pages/crm/leads/LeadsForm";
import { ClientsIndex } from "../pages/crm/clients/ClientsIndex";
import { ClientDetails } from "../pages/crm/clients/ClientsDetails";
import { ClientsForm } from "../pages/crm/clients/ClientsForm";
import { ConsultationsIndex } from "../pages/crm/consultations/ConsultationsIndex";
import { ConsultationDetails } from "../pages/crm/consultations/ConsultationsDetails";
import { ConsultationsForm } from "../pages/crm/consultations/ConsultationsForm";
import { ActionsIndex } from "../pages/crm/actions/ActionsIndex";
import { ActionDetails } from "../pages/crm/actions/ActionsDetails";
import { ActionsForm } from "../pages/crm/actions/ActionsForm";

import { KeywordsIndex } from "../pages/keywords/KeywordsIndex";
import { RolesIndex } from "../pages/roles/RolesIndex";
import { PermissionsIndex } from "../pages/permissions/PermissionsIndex";
import { UsersIndex } from "../pages/users/UsersIndex";
import { TagsIndex } from "../pages/tags/TagsIndex";
import { CategoriesIndex } from "../pages/categories/CategoriesIndex";
import { UserProfile } from "../pages/user-profile/UserProfile";

export const routes = [
  {
    path: "/dashboard",
    element: <DashboardView />,
    exact: true,
    layout: LayoutWithSubMenu,
    name: "Dashboard",
  },

  //leaves

  //staff
  {
    path: "/staff",
    layout: LayoutWithSubMenu,
    element: <StaffIndex />,

    children: [
      {
        path: "/:staffId",
        element: <StaffDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:staffId/edit-staff",
        element: <StaffForm1 />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add-staff",
        layout: LayoutWithSubMenu,
        element: <StaffForm1 />,
      },
    ],
  },

  //staff- appraisal

  //staff-targets
  {
    path: "/staff-targets",
    layout: LayoutWithSubMenu,
    element: <StaffTargetsIndex />,

    children: [
      {
        path: "/:staffTargetId",
        element: <StaffTargetDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:staffTargetId/edit",
        element: <StaffTargetForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        layout: LayoutWithSubMenu,
        element: <StaffTargetForm />,
      },
    ],
  },
  //department-targets
  {
    path: "/department-targets",
    layout: LayoutWithSubMenu,
    element: <DepartmentTargetsIndex />,

    children: [
      {
        path: "/:departmentTargetId",
        element: <DepartmentTargetDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:departmentTargetId/edit",
        element: <DepartmentTargetForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        layout: LayoutWithSubMenu,
        element: <DepartmentTargetForm />,
      },
    ],
  },

  //firm-targets
  {
    path: "/firm-targets",
    layout: LayoutWithSubMenu,
    element: <FirmTargetsIndex />,

    children: [
      {
        path: "/:firmTargetId",
        element: <FirmTargetDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:firmTargetId/edit",
        element: <FirmTargetForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        layout: LayoutWithSubMenu,
        element: <FirmTargetForm />,
      },
    ],
  },

  //review-period
  {
    path: "/review-period",
    layout: LayoutWithSubMenu,
    element: <ReviewPeriodIndex />,

    children: [
      {
        path: "/:reviewPeriodId",
        element: <ReviewPeriodDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:reviewPeriodId/edit",
        element: <ReviewPeriodForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        layout: LayoutWithSubMenu,
        element: <ReviewPeriodForm />,
      },
    ],
  },
  //department
  {
    path: "/departments",
    layout: LayoutWithSubMenu,
    element: <DepartmentsIndex />,

    children: [
      {
        path: "/:departmentId",
        element: <DepartmentDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:departmentId/edit-department",
        element: <DepartmentForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add-department",
        element: <DepartmentForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //sectors
  {
    path: "/sectors",
    layout: LayoutWithSubMenu,
    element: <SectorsIndex />,

    children: [
      {
        path: "/:sectorId",
        element: <SectorDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:sectorId/edit-sector",
        element: <SectorsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add-sector",
        element: <SectorsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //practice areas
  {
    path: "/practice-areas",
    layout: LayoutWithSubMenu,
    element: <PracticeAreasIndex />,

    children: [
      {
        path: "/:practiceAreaId",
        element: <PracticeAreasDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:practiceAreaId/edit-practice-area",
        element: <PracticeAreasForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add-practice-area",
        element: <PracticeAreasForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //practice areas
  {
    path: "/categories",
    layout: LayoutWithSubMenu,
    element: <CategoriesIndex />,
  },

  //practice areas
  {
    path: "/tags",
    layout: LayoutWithSubMenu,
    element: <TagsIndex />,
  },
  //users
  {
    path: "/users",
    layout: LayoutWithSubMenu,
    element: <UsersIndex />,
  },
  //permissions
  {
    path: "/permissions",
    layout: LayoutWithSubMenu,
    element: <PermissionsIndex />,
  },
  //roles
  {
    path: "/roles",
    layout: LayoutWithSubMenu,
    element: <RolesIndex />,
  },
  //keywords
  {
    path: "/keywords",
    layout: LayoutWithSubMenu,
    element: <KeywordsIndex />,
  },
  //user-profile
  {
    path: "/user-profile",
    layout: LayoutWithSubMenu,
    element: <UserProfile />,
  },
  //designations
  {
    path: "/designations",
    layout: LayoutWithSubMenu,
    element: <DesignationsIndex />,

    children: [
      {
        path: "/:designationId",
        element: <DesignationDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:designationId/edit-designation",
        element: <DesignationsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add-designation",
        element: <DesignationsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //visits
  {
    path: "/visits",
    layout: LayoutWithSubMenu,
    element: <VisitsIndex />,

    children: [
      {
        path: "/:visitId",
        element: <VisitDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:visitId/edit-visit",
        element: <VisitForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add-visit",
        element: <VisitForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //visit category
  {
    path: "/visit-category",
    layout: LayoutWithSubMenu,
    element: <VisitCategoryIndex />,

    children: [
      {
        path: "/:visitCategoryId",
        element: <VisitCategoryDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:visitCategoryId/edit",
        element: <VisitCategoryForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <VisitCategoryForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //office areas
  {
    path: "/office-areas",
    layout: LayoutWithSubMenu,
    element: <OfficeAreasIndex />,

    children: [
      {
        path: "/:officeAreaId",
        element: <OfficeAreasDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:officeAreaId/edit",
        element: <OfficeAreasForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <OfficeAreasForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //visit status
  {
    path: "/visit-status",
    layout: LayoutWithSubMenu,
    element: <VisitStatusIndex />,

    children: [
      {
        path: "/:visitStatusId",
        element: <VisitStatusDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:visitStatusId/edit",
        element: <VisitStatusForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <VisitStatusForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //expected visitors
  {
    path: "/expected-visitors",
    layout: LayoutWithSubMenu,
    element: <ExpectedVisitorsIndex />,

    children: [
      {
        path: "/:expectedVisitorId",
        element: <ExpectedVisitorsDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:expectedVisitorId/edit",
        element: <ExpectedVisitorsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <ExpectedVisitorsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },
  //visit entry
  {
    path: "/visit-entry",
    layout: LayoutWithSubMenu,
    element: <VisitEntryIndex />,

    children: [
      {
        path: "/:visitEntryId",
        element: <VisitEntryDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:visitEntryId/edit",
        element: <VisitEntryForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <VisitEntryForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //incoming dispatch
  {
    path: "/incoming-dispatch",
    layout: LayoutWithSubMenu,
    element: <IncomingDispatchesIndex />,

    children: [
      {
        path: "/:incomingDispatchId",
        element: <IncomingDispatchDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:incomingDispatchId/edit",
        element: <IncomingDispatchForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <IncomingDispatchForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },
  //outgoing dispatch
  {
    path: "/outgoing-dispatch",
    layout: LayoutWithSubMenu,
    element: <OutgoingDispatchesIndex />,

    children: [
      {
        path: "/:outgoingDispatchId",
        element: <OutgoingDispatchDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:outgoingDispatchId/edit",
        element: <OutgoingDispatchForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <OutgoingDispatchForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //crm leads
  {
    path: "/leads",
    layout: LayoutWithSubMenu,
    element: <LeadsIndex />,

    children: [
      {
        path: "/:leadId",
        element: <LeadDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:leadId/edit",
        element: <LeadsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <LeadsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //crm clients
  {
    path: "/clients",
    layout: LayoutWithSubMenu,
    element: <ClientsIndex />,

    children: [
      {
        path: "/:clientId",
        element: <ClientDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:clientId/edit",
        element: <ClientsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <ClientsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //crm consultations
  {
    path: "/consultations",
    layout: LayoutWithSubMenu,
    element: <ConsultationsIndex />,

    children: [
      {
        path: "/:consultationId",
        element: <ConsultationDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:consultationId/edit",
        element: <ConsultationsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <ConsultationsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },

  //crm actions
  {
    path: "/actions",
    layout: LayoutWithSubMenu,
    element: <ActionsIndex />,

    children: [
      {
        path: "/:actionId",
        element: <ActionDetails />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/:actionId/edit",
        element: <ActionsForm />,
        layout: LayoutWithSubMenu,
      },
      {
        path: "/add",
        element: <ActionsForm />,
        layout: LayoutWithSubMenu,
      },
    ],
  },
];
