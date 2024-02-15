import classNames from "classnames";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

export const FormField = (props: {
  label: string;
  fieldType: string;
  fieldName: string;
  formikForm: any;
  placeholder?: string;
  options?: any;
}) => {
  const isFormFieldInvalid = (name) =>
    !!(props.formikForm.touched[name] && props.formikForm.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      // eslint-disable-next-line
      <small className="p-error text-left">
        {props.formikForm.errors[name] as any}
      </small>
    ) : (
      <small className="p-error text-left">&nbsp;</small>
    );
  };
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor="due_date"
        className="font-medium text-left mb-3 text-gray-500 "
      >
        {props.label}
      </label>
      <div className="flex flex-col">
        {props.fieldType === "date" ? (
          <Calendar
            inputId={props.fieldName}
            name={props.fieldName}
            value={
              props.formikForm.values[props.fieldName]
                ? new Date(props.formikForm.values[props.fieldName])
                : null
            }
            className={classNames({
              "p-invalid": isFormFieldInvalid(props.fieldName),
            })}
            onChange={(e) => {
              props.formikForm.setFieldValue(props.fieldName, e.target.value);
            }}
            showIcon
            placeholder="dd/mm/yyyy"
          />
        ) : props.fieldType === "text" ? (
          <InputText
            type="text"
            name={props.fieldName}
            placeholder={props.placeholder}
            value={props.formikForm.values[props.fieldName]}
            onChange={(e) => {
              props.formikForm.setFieldValue(props.fieldName, e.target.value);
            }}
            className={classNames(
              { "p-invalid": isFormFieldInvalid(props.fieldName) },
              "w-full p-1 ml-3 text-gray-500 outline-none"
            )}
          />
        ) : props.fieldType === "dropdown" ? (
          <Dropdown
            value={props.formikForm.values[props.fieldName]}
            onChange={(e) => {
              props.formikForm.setFieldValue(props.fieldName, e.target.value);
            }}
            options={props.options ?? []}
            optionLabel="label"
            showClear
            placeholder={props.placeholder}
            className={classNames(
              { "p-invalid": isFormFieldInvalid(props.fieldName) },
              "w-full  text-gray-500 outline-none"
            )}
          />
        ) : props.fieldType === "editor" ? (
          <Editor
            placeholder={props.placeholder}
            value={props.formikForm.values[props.fieldName]}
            onTextChange={(e) =>
              props.formikForm.setFieldValue(props.fieldName, e.htmlValue)
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
        ) : props.fieldType === "file" ? (
          <InputText
            type="file"
            name={props.fieldName}
            placeholder={props.placeholder}
            value={props.formikForm.values[props.fieldName]}
            onChange={(e) => {
              props.formikForm.setFieldValue(props.fieldName, e.target.value);
            }}
            className="w-full p-1 ml-3 text-gray-500 outline-none"
          />
        ) : props.fieldType === "number" ? (
          <InputNumber
            value={props.formikForm.values[props.fieldName]}
            onValueChange={(e) =>
              props.formikForm.setFieldValue(props.fieldName, e.value)
            }
            showButtons
            mode="decimal"
            placeholder="0"
          />
        ) : null}
      </div>
      {getFormErrorMessage(props.fieldName)}
    </div>
  );
};
