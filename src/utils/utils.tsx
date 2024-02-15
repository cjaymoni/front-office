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

export function createOptionsFromEnum(enumObj) {
  return Object.keys(enumObj).map((key) => {
    return {
      label: key,
      value: enumObj[key],
    };
  });
}

export enum IUserTypes {
  CLERK = "Clerk",
  "FRONT DESK EXECUTIVE" = "Front_Desk_Executive",
  "PERSONAL ASSISTANT" = "Personal_Assistant",
  "OFFICE MANAGER" = "Office_Manager",
  PARTNERS = "Partners",
  "MANAGING PARTNER" = "Managing_Partner",
  "SENIOR PARTNER" = "Senior_Partner",
  ASSOCIATE = "Associate",
  "SENIOR ASSOCIATE" = "Senior_Associate",
  ADMIN = "Admin",
}

// export const getEnumKeyByEnumValue = (enumObj, enumValue) => {
//   let keys = Object.keys(enumObj).filter((x) => enumObj[x] === enumValue);
//   return keys.length > 0 ? keys[0] : null;
// };

//test user credentials

//front desk executive
//username: front_desk_executive1@test.com
//password: password123

//clerk
//username: clerk1@test.com
//password: password123

//personal assistant
//username: personalassistant1@test.com
//password: password123

//office manager
//username: office_manager1@test.com
//password: password123

//partners
//username: managing_partner1@test.com
//password: password123

//senior partner
//username: senior_partner1@test.com
//password: password123

//partner
//username: partner1@test.com
//password: password123

//associate
//username: associate1@test.com
//password: password123

//senior associate
//username: senior_associate1@test.com
//password: password123

//admin
//username: admin@test.com
//password: password123
