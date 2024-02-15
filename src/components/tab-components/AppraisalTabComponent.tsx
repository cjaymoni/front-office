import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { AppraisalCard } from "../cards/appraisal-card/AppraisalCard";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { AppraisalTabForm } from "../context-forms/AppraisalTabForm";

export const AppraisalTabComponent = () => {
  const [visible, setVisible] = useState(false);
  const [commissionPerCase, setCommissionPerCase] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [timelinessScore, setTimelinessScore] = useState(0);
  const [efficiencyScore, setEfficiencyScore] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  const [staffTargetId, setStaffTargetId] = useState(0);
  const [departmentTargetId, setDepartmentTargetId] = useState(0);
  const [reviewPeriodId, setReviewPeriodId] = useState(0);
  const [filteredStaffTargets, setFilteredStaffTargets] = useState([]);

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
      <AppraisalCard handleEditClick={() => setVisible(true)} />
      <br />
      <AppraisalCard handleEditClick={() => setVisible(true)} />

      <Dialog
        header={`Add Appraisal `}
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
      >
        <AppraisalTabForm />
      </Dialog>
    </div>
  );
};
