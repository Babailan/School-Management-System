"use client";

import { HotTable } from "@handsontable/react";
import HotTableClass from "@handsontable/react/hotTableClass";
import { Box, Button, ScrollArea, Text } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { memo, useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  const mutation = useMutation({
    mutationFn: () => {
      return axios.get("http://localhost:3001/api/curriculum");
    },
    mutationKey: ["Test"],
  });

  return <div></div>;
}
// export default function Page() {
//   const data = [
//     { id: 2, name: "Frank Honest", address: "" },
//     { id: 3, name: "Joan Well", address: "" },
//     { id: 4, name: "Gail Polite", address: "" },
//     { id: 5, name: "Michael Fair", address: "" },
//   ];

//   const hotRef = useRef<HotTableClass>(null);

//   const headers = () => {
//     const header = ["Student Name"];
//     for (let i = 0; i < 10; i++) {
//       header.push("W" + (i + 1));
//     }
//     for (let i = 0; i < 5; i++) {
//       header.push("P" + (i + 1));
//     }
//     header.push("QA");
//     return header;
//   };

//   return (
//     <Box className="space-y-5">
//       <HotTable
//         ref={hotRef}
//         data={data}
//         colHeaders={headers()}
//         height="auto"
//         autoWrapRow={true}
//         rowHeaders={false}
//         autoWrapCol={true}
//         columns={[
//           { type: "text", data: "name" },
//           { type: "numeric", data: "w1" },
//           { type: "numeric", data: "w2" },
//           { type: "numeric", data: "w3" },
//           { type: "numeric", data: "w4" },
//           { type: "numeric", data: "w5" },
//           { type: "numeric", data: "w6" },
//           { type: "numeric", data: "w7" },
//           { type: "numeric", data: "w8" },
//           { type: "numeric", data: "w9" },
//           { type: "numeric", data: "w10" },
//           { type: "numeric", data: "p1" },
//           { type: "numeric", data: "p2" },
//           { type: "numeric", data: "p3" },
//           { type: "numeric", data: "p4" },
//           { type: "numeric", data: "p5" },
//           { type: "numeric", data: "qa" },
//         ]}
//         licenseKey="non-commercial-and-evaluation"
//       />
//       <Button
//         onClick={() => {
//           console.log(hotRef.current.hotInstance.getSourceData());
//         }}
//       >
//         Get Scheme
//       </Button>
//     </Box>
//   );
// }
