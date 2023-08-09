import { Formik, Field, Form } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ErrorMessagBox } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { style } from "typestyle";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

export const LeaveForm = (props: ILeaveFormProps) => {
  const [leaveDetails, setLeaveDetails] = useState<ILeave>(
    props.leaveDetails ?? ({} as ILeave)
  );

  const urlParams = useParams();
  if (urlParams.leaveId) {
    //fetch form data
    //set data
  }

  useEffect(() => {
    if (urlParams.leaveId) {
      setLeaveDetails({
        firstName: "jude",
        lastName: "last",
        email: "jay@mail.com",
      });
      //   setLeaveDetails(props.leaveDetails);
    }
  }, [urlParams.leaveId]);
  return (
    <div className="w-full p-4">
      <div className="flex flex-1  items-center p-2">
        <h1 className="my-4 ml-4 text-2xl text-black">New Leave</h1>{" "}
      </div>

      <FormikForm leaveDetails={leaveDetails} />
    </div>
  );
};

const FormikForm = (props: { leaveDetails: ILeave }) => {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState<ILeave>(props.leaveDetails);

  useEffect(() => {
    setLeaveDetails(props.leaveDetails);
  }, [props.leaveDetails]);
  console.log(leaveDetails);
  return (
    <Formik
      initialValues={leaveDetails}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
      enableReinitialize
    >
      {({ errors, touched, isValid }) => (
        <Form className="w-full p-4 flex flex-col">
          {isSubmitted && Object.keys(errors).length > 0 && (
            <ErrorMessagBox errors={errors} />
          )}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="firstName"
              className="font-medium text-left mb-3 text-gray-500"
            >
              First Name
            </label>
            <Field name="firstName">
              {({
                field, // { name, value, onChange, onBlur }
                touched,
                errors, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <div className="flex flex-col">
                  <InputText
                    type="text"
                    placeholder="first name"
                    {...field}
                    className="w-full p-1 ml-3 text-gray-500 outline-none"
                  />
                  {meta.touched && meta.error && (
                    <div className="text-red-600 text-left mt-2 text-sm">
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="lastName"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Last Name
            </label>
            <Field name="lastName">
              {({
                field, // { name, value, onChange, onBlur }
                touched,
                errors, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <div className="flex flex-col">
                  <InputText
                    type="text"
                    placeholder="last name"
                    {...field}
                    className="w-full p-1 ml-3 text-gray-500 outline-none"
                  />
                  {meta.touched && meta.error && (
                    <div className="text-red-600 text-left mt-2 text-sm">
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="email"
              className="font-medium text-left mb-3 text-gray-500"
            >
              Email
            </label>
            <Field name="email">
              {({
                field, // { name, value, onChange, onBlur }
                touched,
                errors, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <div className="flex flex-col">
                  <InputText
                    type="email"
                    placeholder="email"
                    {...field}
                    className="w-full p-1 ml-3 text-gray-500 outline-none"
                  />
                  {meta.touched && meta.error && (
                    <div className="text-red-600 text-left mt-2 text-sm">
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div className="flex  justify-end">
            <Button
              type="submit"
              label="Save"
              icon="pi pi-save"
              className={style({
                marginRight: "1rem",
              })}
              onClick={() => setIsSubmitted(true)}
            />
            <Button
              label="Go back"
              icon="pi pi-arrow-left"
              onClick={() => navigate(-1)}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

interface ILeave {
  firstName: string;
  lastName: string;
  email: string;
}

interface ILeaveFormProps {
  leaveDetails?: ILeave;
}
