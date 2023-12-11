import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as locales from "@mui/material/locale";

type SupportedLocales = keyof typeof locales;
interface props {
  locale: SupportedLocales;
  setLocale: (v: SupportedLocales) => void;
}
export default function Locales({ locale, setLocale }: props) {
  // Filter only 'arSA' and 'enUS' locales
  const filteredLocales = Object.keys(locales).filter(
    key => key === "arSA" || key === "enUS"
  );

  return (
    <Autocomplete
      options={filteredLocales}
      getOptionLabel={key => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
      style={{ width: 150 }}
      value={locale}
      disableClearable
      onChange={(_event: any, newValue: string | null) => {
        setLocale(newValue as SupportedLocales);
      }}
      renderInput={params => <TextField {...params} label='Locale' />}
    />
  );
}
