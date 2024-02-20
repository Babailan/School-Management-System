"use client";

import HotTable from "@handsontable/react";
import HotTableClass from "@handsontable/react/hotTableClass";
import { Box, Button, ScrollArea, Text } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { memo, useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  const hotRef = useRef<HotTableClass>(null);

  const headers = () => {
    const header = ["Student Name"];
    for (let i = 0; i < 10; i++) {
      header.push("W" + (i + 1));
    }
    for (let i = 0; i < 5; i++) {
      header.push("P" + (i + 1));
    }
    header.push("QA");
    return header;
  };

  return (
    <Box className="space-y-5">
      <HotTable
        ref={hotRef}
        colHeaders={["RONGNEN"]}
        height="auto"
        autoWrapRow={true}
        minCols={40}
        rowHeaders={false}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
        className="max-w-xl"
      />
    </Box>
  );
}
