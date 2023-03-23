const prefix = "LAYOUT";

const layoutActions = {
  MENU_TOGGLE: `${prefix}_MENU_TOGGLE`,
  MENU_HIDE: `${prefix}_MENU_HIDE`,
  MENU_SHOW: `${prefix}_MENU_SHOW`,

  doToggleMenu: () => ({
    type: layoutActions.MENU_TOGGLE,
  }),

  doShowMenu: () => ({
    type: layoutActions.MENU_SHOW,
  }),

  doHideMenu: () => ({
    type: layoutActions.MENU_HIDE,
  }),
};

export default layoutActions;
