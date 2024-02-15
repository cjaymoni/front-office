import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import {
  IReviewPeriod,
  fetchReviewPeriodsRequest,
} from "../../pages/appraisal/review-period/reviewPeriodApiRequest";
import {
  IDepartmentTarget,
  fetchDepartmentTargetsRequest,
} from "../../pages/appraisal/department-target/departmentTargetApiRequest";
import { IStaffTarget } from "../../pages/appraisal/staff-target/staffTargetApiRequest";
import { AutoComplete } from "primereact/autocomplete";

export function AppraisalTabForm() {
  const [reviewPeriods, setReviewPeriods] = useState([]);
  const [departmentTargets, setDepartmentTargets] = useState([]);

  const [commissionPerCase, setCommissionPerCase] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [timelinessScore, setTimelinessScore] = useState(0);
  const [efficiencyScore, setEfficiencyScore] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  const [staffTargetId, setStaffTargetId] = useState(0);
  const [departmentTargetId, setDepartmentTargetId] = useState(0);
  const [reviewPeriodId, setReviewPeriodId] = useState(0);
  const [filteredStaffTargets, setFilteredStaffTargets] = useState([]);
  const [staffTargets, setStaffTargets] = useState([]);
  const [filteredReviewPeriods, setFilteredReviewPeriods] = useState(null);

  const [filteredDepartmentTargets, setFilteredDepartmentTargets] =
    useState(null);

  useEffect(() => {
    fetchReviewPeriodsRequest().then((response) => {
      setReviewPeriods(response);
    });
    fetchDepartmentTargetsRequest().then((response) => {
      setDepartmentTargets(response);
    });
  }, []);

  const searchStaffTarget = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredStaffTarget;

      if (!event.query.trim().length) {
        _filteredStaffTarget = [...staffTargets];
      } else {
        _filteredStaffTarget = staffTargets.filter((country: IStaffTarget) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredStaffTargets(_filteredStaffTarget);
    }, 250);
  };
  const searchDepartmentTarget = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredDepartmentTarget;

      if (!event.query.trim().length) {
        _filteredDepartmentTarget = [...departmentTargets];
      } else {
        _filteredDepartmentTarget = departmentTargets.filter(
          (country: IDepartmentTarget) => {
            return country.title
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredDepartmentTargets(_filteredDepartmentTarget);
    }, 250);
  };
  const staffTargetTemplate = (item) => {
    return (
      <div key={item}>
        <div>{item.title}</div>
      </div>
    );
  };
  const searchReviewPeriod = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredReviewPeriod;

      if (!event.query.trim().length) {
        _filteredReviewPeriod = [...reviewPeriods];
      } else {
        _filteredReviewPeriod = reviewPeriods.filter(
          (country: IReviewPeriod) => {
            return country.title
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          }
        );
      }

      setFilteredReviewPeriods(_filteredReviewPeriod);
    }, 250);
  };
  return (
    <>
      {" "}
      <div className="w-full p-4 grid grid-cols-3 gap-4">
        {/* staff_Target_id */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="title"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Staff Target
          </label>
          <div className="flex flex-col">
            <Dropdown
              value={staffTargetId}
              onChange={(e) => {
                setStaffTargetId(e.target.value);
              }}
              options={filteredStaffTargets}
              placeholder="Select a staff target"
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* department_target */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="title"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Department Target
          </label>
          <div className="flex flex-col">
            <Dropdown
              value={departmentTargetId}
              onChange={(e) => {
                setDepartmentTargetId(e.target.value);
              }}
              options={[]}
              placeholder="Select a department target"
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* review_period */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="review_period_id"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Review period
          </label>
          <div className="flex flex-col">
            <AutoComplete
              value={reviewPeriodId}
              onChange={(e) => {
                setReviewPeriodId(e.target.value);
              }}
              suggestions={filteredReviewPeriods}
              completeMethod={searchReviewPeriod}
              field="title"
              itemTemplate={staffTargetTemplate}
              dropdown
              placeholder="Select a review period"
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* quality_score */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="quality_score"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Quality score
          </label>
          <div className="flex flex-col">
            <InputNumber
              inputId="quality_score"
              name="quality_score"
              value={qualityScore}
              onValueChange={(e) => setQualityScore(e.value)}
              mode="decimal"
              showButtons
              min={0}
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* efficiency_score */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="efficiency_score"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Efficiency score
          </label>
          <div className="flex flex-col">
            <InputNumber
              inputId="efficiency_score"
              name="efficiency_score"
              value={efficiencyScore}
              onValueChange={(e) => setEfficiencyScore(e.value)}
              mode="decimal"
              showButtons
              min={0}
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* timeliness_score */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="timeliness_score"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Timeliness score
          </label>
          <div className="flex flex-col">
            <InputNumber
              inputId="timeliness_score"
              name="timeliness_score"
              value={timelinessScore}
              onValueChange={(e) => setTimelinessScore(e.value)}
              mode="decimal"
              showButtons
              min={0}
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* accuracy_score */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="accuracy_score"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Accuracy score
          </label>
          <div className="flex flex-col">
            <InputNumber
              inputId="accuracy_score"
              name="accuracy_score"
              value={accuracyScore}
              onValueChange={(e) => setAccuracyScore(e.value)}
              mode="decimal"
              showButtons
              min={0}
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* commission_per_case */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="commission_per_case"
            className="font-medium text-left mb-3 text-gray-500 required-field"
          >
            Commission per case
          </label>
          <div className="flex flex-col">
            <InputNumber
              inputId="commission_per_case"
              name="commission_per_case"
              value={commissionPerCase}
              onValueChange={(e) => setCommissionPerCase(e.value)}
              mode="decimal"
              showButtons
              min={0}
              className="w-full  text-gray-500 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button label="Save" className="h-12 w-24" />
        <Button label="Close" severity="danger" className="h-12 w-24" />
      </div>
    </>
  );
}
