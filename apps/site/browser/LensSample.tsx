// import { Lens } from "@locospec/elements-react";
// import React, { useState, useEffect } from "react";
// import { makeServer } from "../src/server/mocks/mirageServer";
// import "@locospec/elements-react/styles.css";

// const LensSample = () => {
//   useEffect(() => {
//     makeServer();
//   }, []);
//   const [checkedIds, setCheckedIds] = useState([]);

//   const handleSelectionChange = (selectedItem) => {
//     if (selectedItem) {
//       setCheckedIds(selectedItem);
//     } else {
//       setCheckedIds([]);
//     }
//   };

//   return (
//     <Lens
//       // selectionType={"multiple"}
//       configEndpoint="/api/data-bench/test-data/config"
//       dataEndpoint="/api/data-bench/test-data/fetch"
//       onSelect={(value) => {
//         handleSelectionChange(value);
//       }}
//       selectedItems={checkedIds}
//     />
//   );
// };

// export default LensSample;
