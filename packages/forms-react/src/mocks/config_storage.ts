const config = {
  // resource: "auction-data",
  // identifierKey: "auction-data",
  view_id: "default",
  selectionType: "none",
  actions: {
    header: "Actions",
    align: "end",
    fixed: true,
    minWidth: 200,
    options: [
      {
        key: "edit",
        url: "/edit/:id",
        icon: "SquarePen",
        method: "GET",
      },
      {
        key: "delete",
        url: "/delete/:id/for/:state.id",
        icon: "Trash2",
        text: "Delete",
        method: "GET",
        confirmation: true,
      },
    ],
  },
  columns: [
    {
      accessorKey: "id",
      header: "Sr no.",
      width: 80,
      maxWidth: 80,
      minWidth: 80,
      fixed: true,
    },
    {
      accessorKey: "state",
      header: "State",
      width: 100,
      minWidth: 100,
      show: false,
    },
    {
      accessorKey: "district",
      header: "District",
      width: 100,
      minWidth: 100,
      show: false,
    },
    {
      accessorKey: "cities",
      header: "Cities",
      width: 100,
      minWidth: 100,
      show: false,
    },
    {
      accessorKey: "current_users",
      header: "Current Users",
      width: 100,
      minWidth: 200,
    },
    {
      accessorKey: "locality",
      header: "Locality",
      width: 100,
      minWidth: 200,
    },
    {
      accessorKey: "properties",
      header: "Properties",
      width: 300,
      minWidth: 100,
    },
  ],
  filters: {
    f_name: {
      label: "First Name",
      type: "string",
      isNullable: false,
    },
    l_name: {
      label: "Last Name",
      type: "string",
    },
    pan: {
      label: "PAN",
      type: "string",
      isNullable: false,
    },
    date_of_birth: {
      label: "DOB",
      type: "date",
      isNullable: false,
      asSimple: true,
    },
    age: {
      label: "Age",
      type: "number",
      isNullable: false,
    },
    category: {
      label: "Category",
      type: "enum",
      isNullable: false,
      selectionType: "single",
      options: [
        { label: "One", value: "One" },
        { label: "Two", value: "Two" },
        { label: "Three", value: "Four" },
      ],
      asSimple: true,
    },
    state: {
      label: "State",
      type: "enum",
      isNullable: false,
      modelName: "state",
      asSimple: true,
    },
    district: {
      label: "District",
      type: "enum",
      isNullable: false,
      dependsOn: ["state"],
      modelName: "district",
      asSimple: true,
    },
    city: {
      label: "City",
      type: "enum",
      isNullable: false,
      dependsOn: ["state", "district"],
      modelName: "city",
    },
    locality: {
      label: "Locality",
      type: "enum",
      isNullable: false,
      dependsOn: ["state", "district", "city"],
      modelName: "locality",
      asSimple: true,
    },
    availability: {
      label: "Availablity",
      type: "boolean",
    },
  },
};

export { config };
