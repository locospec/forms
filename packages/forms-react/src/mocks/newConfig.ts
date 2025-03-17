const new_config = {
  success: true,
  data: {
    name: "sub_asset_type_default_view",
    label: "Sub Asset Types Default View",
    type: "view",
    model: "sub_asset_type",
    attributes: {
      id: {
        type: "string",
        label: "Sr. No.",
      },
      state: {
        type: "string",
        label: "State",
      },
      district: {
        type: "string",
        label: "District",
      },
      cities: {
        type: "string",
        label: "Cities",
      },
    },
    lensSimpleFilters: {
      "state.name": {
        type: "enum",
        label: "States",
        model: "state",
      },
      "district.name": {
        type: "enum",
        label: "District",
        model: "district",
        dependsOn: ["state.name"],
      },
      "city.name": {
        type: "enum",
        label: "City",
        model: "city",
        dependsOn: ["district.name"],
      },
      "locality.name": {
        type: "enum",
        label: "Locality",
        model: "locality",
        dependsOn: ["city.name"],
      },
      category: {
        type: "enum",
        label: "Category",
        model: "category",
        options: [
          { title: "One", const: "One" },
          { title: "Two", const: "Two" },
          { title: "Three", const: "Three" },
        ],
      },
    },
  },
  meta: [],
};

// const new_config_table = {
//   success: true,
//   data: {
//     name: "sub_asset_type_default_view",
//     label: "Sub Asset Types Default View",
//     type: "view",
//     model: "sub_asset_type",
//     attributes: {
//       uuid: {
//         type: "uuid",
//         label: "ID",
//       },
//       name: {
//         type: "string",
//         label: "Name",
//       },
//       asset_type_name: {
//         type: "string",
//         label: "Asset Type Name",
//       },
//     },
//     lensSimpleFilters: {
//       asset_type_name: {
//         type: "enum",
//         label: "Asset Type Name",
//         model: "asset_type",
//       },
//     },
//   },
//   meta: [],
// };

export { new_config };
