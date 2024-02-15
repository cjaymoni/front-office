import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { style } from "typestyle";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const DocsSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is Required"),
  description: Yup.string(),
});
export const UsersForm = () => {
  const formikForm = useFormik({
    initialValues: {},
    validationSchema: DocsSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const it = {
        ...values,
      };

      const filteredObject = Object.entries(it).reduce((acc, [key, value]) => {
        if (value && value !== "NaN") {
          acc[key] = value;
        }
        return acc;
      }, {});
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
  return (
    <div className="w-full">
      <form>
        <div className="w-full p-4 grid grid-cols-2 gap-6 ">
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              First name
            </label>
            <div className="flex flex-col">
              {" "}
              <InputText
                id="first_name"
                aria-describedby="first_name-help"
                placeholder="Enter first name"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("first_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("first_name")}
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Last name
            </label>
            <div className="flex flex-col">
              {" "}
              <InputText
                id="first_name"
                aria-describedby="first_name-help"
                placeholder="Enter first name"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("first_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("first_name")}
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Email Address
            </label>
            <div className="flex flex-col">
              {" "}
              <InputText
                id="first_name"
                aria-describedby="first_name-help"
                placeholder="Enter first name"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("first_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("first_name")}
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Phone
            </label>
            <div className="flex flex-col">
              {" "}
              <InputText
                id="first_name"
                aria-describedby="first_name-help"
                placeholder="Enter first name"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("first_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("first_name")}
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Role
            </label>
            <div className="flex flex-col">
              <Dropdown
                // value={selectedCity}
                // onChange={(e) => setSelectedCity(e.value)}
                options={[
                  { name: "Admin", code: "NY" },
                  { name: "User", code: "RM" },
                  { name: "Editor", code: "LDN" },
                  { name: "Super Admin", code: "IST" },
                  { name: "Author", code: "PRS" },
                ]}
                optionLabel="name"
                placeholder="Select a role"
                className="w-full"
              />
              {/* <InputText
                id="first_name"
                aria-describedby="first_name-help"
                placeholder="Enter first name"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("first_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              /> */}
            </div>
            {getFormErrorMessage("first_name")}
          </div>
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
              //   scrollToElement(targetRef);
              //   setIsSubmitted(true);
            }}
          />
          <Button
            label="Close"
            icon="pi pi-times"
            type="button"
            severity="danger"
            // onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
};
