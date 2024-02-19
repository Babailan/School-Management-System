import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React, { useRef, useState } from "react";

type PaginationProps = {
  maxPage: number;
  page: number;
  setPage: React.Dispatch<any>;
};

const Pagination: React.FC<PaginationProps> = ({ maxPage, page, setPage }) => {
  const nextButton = () => {
    const nextPage = page + 1;
    if (nextPage <= maxPage) {
      setPage(nextPage);
    }
  };

  const previousButton = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
    }
  };

  return (
    <Flex align={"center"} justify={"between"}>
      <Box>
        <Button
          variant="outline"
          className="hover:cursor-pointer"
          onClick={previousButton}
        >
          <ArrowLeftIcon />
          Previous
        </Button>
      </Box>
      <Box>
        <Text size={"2"}>
          Page {page} of {maxPage}
        </Text>
      </Box>
      <Box>
        <Button
          variant="outline"
          className="hover:cursor-pointer"
          onClick={nextButton}
        >
          Next
          <ArrowRightIcon />
        </Button>
      </Box>
    </Flex>
  );
};

export default Pagination;
