import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { ReactNode } from "react";

export const MultiSelectWithCreate = (props: IDropdownWithCreateProps) => {
  const emptyMessageTemplate = () => {
    return (
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl text-gray-500 font-semibold capitalize">
          No {props.inputName} Found
        </h2>
        <Button icon="pi pi-plus" onClick={() => props.onButtonClick()} />
      </div>
    );
  };

  return (
    <div className="w-full">
      <MultiSelect
        optionLabel={props.optionLabel}
        optionValue={props.optionValue}
        name={props.inputName}
        value={props.value}
        onChange={(e) => {
          props.onChange(e);
        }}
        display="chip"
        filter
        placeholder={props.placeholder}
        className={props.className}
        emptyFilterMessage={emptyMessageTemplate}
        options={props.options}
        itemTemplate={props.itemDropdownTemplate}
      />
    </div>
  );
};

interface IDropdownWithCreateProps {
  itemDropdownTemplate?: ReactNode;
  onChange: (event: any) => void;
  options: any[];
  placeholder: string;
  value: any;
  optionLabel: string;
  optionValue: string;
  inputName: string;
  className: any;
  onButtonClick: () => void;
}
