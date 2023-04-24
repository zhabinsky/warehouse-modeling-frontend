import { Paper, Stack } from "@mui/material";
import { ComponentProps } from "react";

export const SideMenu: React.FC<ComponentProps<typeof Stack>> = ({
  children,
  ...props
}) => {
  return (
    <Stack
      spacing={1}
      component={Paper}
      elevation={3}
      p={1}
      borderRadius={7}
      {...props}
    >
      {children}
    </Stack>
  );
};
