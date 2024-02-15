import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { style } from "typestyle";
import { InputTextarea } from "primereact/inputtextarea";

const DocsSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is Required"),
  description: Yup.string(),
});
export const KeywordsForm = (props: { categoryName: string }) => {
  const formikForm = useFormik({
    initialValues: { title: props.categoryName },
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
              htmlFor="title"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Keyword
            </label>
            <div className="flex flex-col">
              {" "}
              <InputText
                id="title"
                aria-describedby="title-help"
                placeholder="Enter a keyword"
                className={classNames(
                  { "p-invalid": isFormFieldInvalid("title") },
                  "w-full p-1 ml-3 text-gray-500 outline-none"
                )}
              />
            </div>
            {getFormErrorMessage("title")}
          </div>
          {/* description */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="font-medium text-left mb-3 text-gray-500 required-field"
            >
              Description
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
