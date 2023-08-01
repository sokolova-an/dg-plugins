"use client";

import { SimpleGrid } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPluginsData } from "@/helpers/parseData";
import { ResponseType } from "@/helpers/types";
import { getChangesPlugins } from "@/helpers/parseData";
import { changeData } from "@/helpers/api";
import PluginCard from "../plugin-card/PluginCard";

const URL = {
  "/marketing": "tab1",
  "/finance": "tab2",
  "/personnel": "tab3",
};

export default function PluginList({
  data,
  children,
}: {
  children: React.ReactNode;
  data: ResponseType;
}) {
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const search = URL[pathname as keyof typeof URL];
  const allPlugins = getPluginsData(data.tabdata, data.plugins, search);

  const { mutate } = useMutation(changeData, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(["data"], () => data);
    },
  });

  const handleChange = (isActive: boolean, id: string) => {
    console.log(isActive, id, 0);
    const { active, disabled } = getChangesPlugins(isActive, id, data, search);
    mutate({
      ...data,
      tabdata: {
        ...data.tabdata,
        [search]: {
          ...data.tabdata[search],
          active: active,
          disabled: disabled,
        },
      },
    });
  };

  return (
    <>
      {children}
      <SimpleGrid spacing={10} columns={{ sm: 2, md: 3 }}>
        {allPlugins
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((item) => (
            <PluginCard
              key={item.title}
              plugin={item}
              onChange={handleChange}
              isAllActive={data?.isAllActive}
            />
          ))}
      </SimpleGrid>
    </>
  );
}
