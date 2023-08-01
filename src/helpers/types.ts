export type TabData = {
  title: "string";
  icon: "string";
  active: "string"[];
  disabled: "string"[];
  inactive: "string"[];
};
export type TabsData = {
  [key: string]: TabData;
};

export type Plugin = {
  title: string;
  description: string;
};
export type Plugins = {
  [key: string]: Plugin;
};

export type ResponseType = {
  tabdata: TabsData;
  plugins: Plugins;
  tabs: (keyof TabsData)[];
  isAllActive?: boolean;
};

export interface ParsedPlugin extends Plugin {
  active: boolean;
  inactive?: boolean;
  id: string;
}
