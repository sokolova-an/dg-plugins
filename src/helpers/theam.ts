import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    _checked: {
      bg: 'green',
    },
    bg: "red.500",
  },
});

const switchTheme = defineMultiStyleConfig({ baseStyle });

export const theme = extendTheme({
  components: { Switch: switchTheme },
})