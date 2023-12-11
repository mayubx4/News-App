import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Chip,
  Typography,
  Toolbar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MaterialUISwitch from "./MuiSwitch";
import Locales from "./LanguageDropdown";
import * as locales from "@mui/material/locale";

type SupportedLocales = keyof typeof locales;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
  selectedChip: string;
  setSelectedChip: (label: string) => void;
  locale: SupportedLocales;
  setLocale: (v: SupportedLocales) => void;
  themeToggle: boolean;
  setThemeToggle: (v: boolean) => void;
}

const drawerWidth = 240;
const navItems = ["apple", "meta", "netflix", "google", "twitter", "tesla"];

export default function DrawerAppBar({
  window,
  children,
  setSelectedChip,
  selectedChip,
  locale,
  setLocale,
  themeToggle,
  setThemeToggle,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  const handleThemeToggle = () => {
    setThemeToggle(!themeToggle);
  };

  const handleChipClick = (label: string) => {
    setSelectedChip(label);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const theme = useTheme();
  //   console.log(theme, direction);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        News-App
      </Typography>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <Chip
              label={item}
              clickable
              onClick={() => handleChipClick(item)}
              style={{
                margin: "5px auto",
                border:
                  selectedChip === item
                    ? `1px solid ${
                        theme.palette.mode === "light" ? "black" : "white"
                      }`
                    : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <CssBaseline />
      <AppBar component='nav' color='default'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            textAlign='left'
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
          >
            News-App
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item, index) => (
              <Chip
                key={index}
                label={item}
                clickable
                onClick={() => handleChipClick(item)}
                style={{
                  margin: "0 5px",
                  border:
                    selectedChip === item
                      ? `1px solid ${
                          theme.palette.mode === "light" ? "black" : "white"
                        }`
                      : "none",
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialUISwitch
              checked={!themeToggle}
              onChange={handleThemeToggle}
              color='default'
            />
            <div style={{ padding: 10 }}>
              <Locales locale={locale} setLocale={setLocale} />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component='main'>
        <Toolbar />
        <Toolbar />
        {children ?? null}
      </Box>
    </Box>
  );
}
