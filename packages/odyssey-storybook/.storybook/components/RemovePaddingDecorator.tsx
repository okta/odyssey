import type { Decorator } from "@storybook/react";
import { Box } from "@mui/material";

export const RemovePaddingDecorator: Decorator = (Story) => (
  <Box
    sx={{
      margin: "-16px",
    }}
  >
    <Story />
  </Box>
);
