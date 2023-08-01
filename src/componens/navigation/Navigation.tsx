"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import { TabsData } from "@/helpers/types";
import { getIcon } from "./getIcon";

const MENU_LIST = {
  Marketing: { href: "/marketing" },
  Finance: { href: "/finance" },
  Personnel: { href: "/personnel" },
};

type NavigationTypes = {
  tabdata: TabsData;
  tabs: (keyof TabsData)[];
};

export default function Navigation({ tabdata, tabs }: NavigationTypes) {
  const tabStyle = { bg: "white", width: "100%" };
  const pathname = usePathname();

  const index = Object.values(MENU_LIST).findIndex(
    (item) => item.href === pathname
  );

  return (
    <Tabs
      variant="unstyled"
      orientation="vertical"
      align="center"
      size="lg"
      width="100%"
      index={index}
    >
      <TabList justifyContent="space-around" height="200px" width="100%">
        {tabs.map((item) => (
          <>
            <Link
              key={tabdata[item].title}
              href={{
                pathname:
                  MENU_LIST[tabdata[item].title as keyof typeof MENU_LIST].href,
              }}
            >
              <Tab _selected={tabStyle} flex="1">
                <Icon boxSize={5} mr="5px" as={getIcon(tabdata[item].icon)} />
                {tabdata[item].title}
              </Tab>
            </Link>
          </>
        ))}
      </TabList>
      <TabIndicator width="5px" bg="red.500" />
    </Tabs>
  );
}
