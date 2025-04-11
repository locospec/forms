const SCHEMA = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      description: "Please enter your name",
    },
    vegetarian: {
      type: "boolean",
    },
    birthDate: {
      type: "string",
      format: "date",
    },
    nationality: {
      type: "string",
      uniqueItems: true,
      options: [
        { title: "India", const: "IN" },
        { title: "Denmark", const: "DE" },
        { title: "Italy", const: "IT" },
        { title: "Japan", const: "JP" },
        { title: "Russia", const: "RU" },
        { title: "Other", const: "OTHER" },
      ],
    },
    states: {
      type: "string",
      modelName: "states",
    },
    districts: {
      type: "string",
      dependsOn: ["states"],
      modelName: "districts",
    },
    cities: {
      type: "string",
      dependsOn: ["districts", "states"],
      modelName: "cities",
    },
    personalData: {
      type: "object",
      properties: {
        age: {
          type: "integer",
          description: "Please enter your age.",
        },
        height: {
          type: "number",
        },
        drivingSkill: {
          type: "number",
          maximum: 10,
          minimum: 1,
          default: 7,
        },
      },
      required: ["age", "height"],
    },
    occupation: {
      type: "string",
    },
    postalCode: {
      type: "string",
      maxLength: 5,
    },
  },
  required: ["occupation", "nationality", "states"],
};

const UI_SCHEMA = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
        },
        {
          type: "Control",
          scope: "#/properties/personalData/properties/age",
        },
        {
          type: "Control",
          scope: "#/properties/birthDate",
        },
      ],
    },
    {
      type: "Label",
      text: "Additional Information",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/personalData/properties/height",
        },
        {
          type: "lens-enum",
          scope: "#/properties/nationality",
        },
        {
          type: "Control",
          scope: "#/properties/occupation",
          options: {
            suggestion: [
              "Accountant",
              "Engineer",
              "Freelancer",
              "Journalism",
              "Physician",
              "Student",
              "Teacher",
              "Other",
            ],
          },
        },
      ],
    },
    {
      type: "Label",
      text: "lens-enum TESTING",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "lens-enum",
          scope: "#/properties/states",
        },
        {
          type: "lens-enum",
          scope: "#/properties/districts",
        },
        {
          type: "lens-enum",
          scope: "#/properties/cities",
        },
      ],
    },
  ],
};

export { SCHEMA, UI_SCHEMA };
