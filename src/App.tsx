import { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ActionAreaCard from "./components/ActionAreaCard";
import useFetch from "./hooks/useFetch";
import { getSevenDaysBefore } from "./utils/utils";
import DrawerAppBar from "./components/AppBar";
import * as locales from "@mui/material/locale";

type SupportedLocales = keyof typeof locales;

function App() {
  const sevenDaysBeforeDate = getSevenDaysBefore();
  const [selectedChip, setSelectedChip] = useState("apple");
  const [themeToggle, setThemeToggle] = useState(true);
  const [locale, setLocale] = useState<SupportedLocales>("enUS"); // Default to 'enUS'
  const apiUrl = `https://newsapi.org/v2/everything?q=${selectedChip}&from=${sevenDaysBeforeDate}&sortBy=publishedAt&language=${locale.slice(
    0,
    2
  )}&apiKey=ba9006e8b92841c7a86a66317a470f15`;
  const [data, loading, error] = useFetch(apiUrl);
  const direction = locale === "enUS" ? "ltr" : "rtl"; // Default to 'ltr' if no direction is found
  const theme = createTheme(
    {
      palette: {
        mode: themeToggle ? "light" : "dark",
      },
      direction,
    },
    locales[locale]
  );
  return (
    <ThemeProvider theme={theme}>
      <DrawerAppBar
        selectedChip={selectedChip}
        setSelectedChip={setSelectedChip}
        locale={locale}
        setLocale={setLocale}
        themeToggle={themeToggle}
        setThemeToggle={setThemeToggle}
      >
        {error ?? !loading ? (
          <Grid container spacing={2} dir={direction}>
            {data?.articles?.length ? (
              data?.articles.map((article, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <ActionAreaCard
                    imgSrc={article.urlToImage}
                    imgAlt={article.source.name}
                    title={article.title}
                    description={article.description}
                    url={article.url}
                  />
                </Grid>
              ))
            ) : (
              <Typography
                variant='h1'
                style={{ marginLeft: 20, direction: "ltr" }}
              >
                No Articles Found
              </Typography>
            )}
          </Grid>
        ) : (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </DrawerAppBar>
    </ThemeProvider>
  );
}

export default App;
