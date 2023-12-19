import { App, Component } from "vue";

import IconifyIcon from "./IconifyIcon";
import ScreenLock from "./ScreenLock";
import { SvgIcon } from "./SvgIcon";
import { Grid, GridItem } from "./Grid";
import SearchForm from "./SearchForm";
import { Modal } from "./Modal";

const Components: { [propName: string]: Component } = {
  IconifyIcon,
  ScreenLock,
  SvgIcon,
  Grid,
  SearchForm,
  GridItem,
  Modal
};

export default {
  install(app: App) {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key]);
    });
  },
};
