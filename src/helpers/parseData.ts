import { Plugins, ParsedPlugin, TabsData, ResponseType } from "./types";

export const getPluginsData = (
  tabdata: TabsData,
  plugins: Plugins,
  tabKey: string
) => {
  const tabInfo = tabdata[tabKey];

  const allPlugins: ParsedPlugin[] = [
    ...tabInfo.active.flatMap((plugin: string) => ({
      ...plugins[plugin],
      active: true,
      id: plugin,
    })),
    ...tabInfo.inactive.flatMap((plugin: string) => ({
      ...plugins[plugin],
      active: true,
      inactive: true,
      id: plugin,
    })),
    ...tabInfo.disabled.flatMap((plugin: string) => ({
      ...plugins[plugin],
      active: false,
      id: plugin,
    })),
  ];
  return allPlugins;
};

export const getChangedPlugins = (
  isActive: boolean,
  id: string,
  data: ResponseType,
  search: string
) => {
  const add = (param: "active" | "disabled") => [
    ...data.tabdata[search][param],
    id,
  ];
  const remove = (param: "active" | "disabled") => [
    ...data.tabdata[search][param].filter((i) => i !== id),
  ];

  const active = isActive ? add("active") : remove("active");
  const disabled = isActive ? remove("disabled") : add("disabled");

  return { active, disabled };
};
