import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({ children, to }: { children: ReactNode, to: string }) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'inherit',
                textTransform: 'uppercase',
                '&.active': {
                    color: 'yellow',
                }
            }}>
            {children}
        </MenuItem>
    )
}