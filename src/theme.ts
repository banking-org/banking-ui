import { extendTheme } from "@chakra-ui/react";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";
import "@fontsource-variable/rubik";

const theme = extendTheme(CalendarDefaultTheme, {
    fonts: {
        heading: `'Rubik Variable', sans-serif`,
        body: `'Rubik Variable', sans-serif`,
    },
});

export default theme;
