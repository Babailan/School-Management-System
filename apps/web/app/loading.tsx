import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

type BoxProps = React.ComponentProps<typeof Box>;

export default function Loading({ ...props }: BoxProps) {
  return (
    <Box {...props}>
      <Skeleton width={300} height={30}></Skeleton>
      <Skeleton height={300} count={10}></Skeleton>
    </Box>
  );
}
