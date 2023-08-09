export const ErrorMessagBox = (props: { errors: any }) => (
  <div className="border border-red-500 rounded-lg">
    <ul className="text-red-500">
      {Object.keys(props.errors).map((key) => (
        <li key={key} className="text-left p-3">
          <i className="pi pi-info-circle mr-2"></i>
          {props.errors[key]}
        </li>
      ))}
    </ul>
  </div>
);

export const ErrorMessageBox = (props: { errors: any }) => (
  <div className="border border-red-500 rounded-lg">
    <ul className="text-red-500">
      {props.errors?.detail?.map((error: any, index: number) => {
        const fieldName = error.loc[1].replace(/_/g, " ");
        return (
          <li key={index} className="text-left p-3">
            <i className="pi pi-info-circle mr-2"></i>
            {`${fieldName} : ${error.msg}`}
          </li>
        );
      })}
    </ul>
  </div>
);
