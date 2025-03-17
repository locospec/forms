const config = {
  name: "states",
  type: "view",
  modelName: "locality",
  config: {
    primaryKey: "uuid",
    connection: "ab_pgsql",
  },
  attributes: {
    uuid: {
      type: "string",
      label: "ID", // header
      width: 500,
      minWidth: 200,
      maxWidth: 500,
      align: "start", // start/center/end
      fixed: true, // true/false
      show: true, // true/false
    },
    name: {
      type: "string",
      label: "Name", // header
      width: 500,
      minWidth: 200,
      maxWidth: 500,
      align: "start", // start/center/end
      fixed: true, // true/false
      show: true, // true/false
    },
    state_name: {
      type: "string",
      label: "State", // header
      width: 500, // default 800
      minWidth: 200,
      maxWidth: 500,
      align: "start", // start/center/end   default start
      fixed: true, // true/false  default false
      show: true, // true/false   default true
      isNullable: true, //  true/false  default true
      filter: {
        type: "enum",
        label: "State Name",
        modelName: "state", // optional only required for the type enum
        dependsOn: [""], // optional only required for the type enum
        options: [
          // optional only required for the type enum
          {
            label: "",
            value: "",
          },
        ],
        asSimple: true, // true/false  only for the enum and date
      },
    },
    district_name: {
      type: "string",
      label: "District", // header
      width: 500,
      minWidth: 200,
      maxWidth: 500,
      align: "start", // start/center/end
      fixed: true, // true/false
      show: true, // true/false
    },
    city_name: {
      type: "string", // required
      label: "City", // header required
      width: 500, // optional
      minWidth: 200, // optional
      maxWidth: 500, // optional
      align: "start", // start/center/end   optional
      fixed: true, // true/false optional
      show: true, // true/false  optional
    },
  },
  scopes: [],
};

export { config };
