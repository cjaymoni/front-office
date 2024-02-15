import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { style } from "typestyle";
import { InputTextarea } from "primereact/inputtextarea";

const DocsSchema = Yup.object().shape({
  tag_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Tag name is Required"),
  description: Yup.string(),
});
export const TagForm = (props: { tagName: string }) => {
  const formikForm = useFormik({
    initialValues: { tag_name: props.tagName },
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
        <div className="w-full p-4 grid grid-cols-1 ">
          <div className="flex flex-col mb-4">
            <label
              htmlFor="tag_name"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Tag Name
            </label>
            <div className="flex flex-col">
              {" "}
              <InputText
                id="tag_name"
                aria-describedby="tag_name-help"
                placeholder="Enter a tag name"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("tag_name") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("tag_name")}
          </div>

          {/* description */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Tag Description
            </label>
            <div className="flex flex-col">
              {" "}
              <InputTextarea
                id="description"
                aria-describedby="description-help"
                placeholder="Enter description"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("description") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
                rows={5}
                cols={30}
              />
            </div>
            {getFormErrorMessage("description")}
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
