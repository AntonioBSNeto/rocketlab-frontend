import { SxProps, Theme } from "@mui/material";

export interface Icon {
  component: React.ElementType;
  key: string;
  value?: string;
  sx?: SxProps<Theme>;
}