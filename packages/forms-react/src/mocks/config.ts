const SCHEMA = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Please enter your name",
    },
    vegetarian: {
      type: "boolean",
    },
    birthDate: {
      format: "date",
      type: "string",
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
      allowedScopes: ["sample"],
    },
    districts: {
      type: "string",
      dependsOn: ["states"],
      modelName: "districts",
      allowedScopes: ["sample", "sample2"],
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
          type: "number",
          title: "Age",
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
  options: {
    rowSpacing: 5,
  },
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "lens-text-input",
          scope: "#/properties/name",
        },
        {
          type: "lens-text-input",
          scope: "#/properties/personalData/properties/age",
        },
        {
          type: "lens-calendar",
          scope: "#/properties/birthDate",
        },
        {
          type: "lens-switch",
          scope: "#/properties/vegetarian",
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
          type: "lens-dropdown",
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
