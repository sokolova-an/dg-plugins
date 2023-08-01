"use client";

import {
  Center,
  Spinner,
  Heading,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navigation from "../navigation/Navigation";
import { changeData, getData } from "@/helpers/api";
import { ResponseType } from "@/helpers/types";
import PluginList from "../plugin-list/PluginList";
import styles from "./PageLayout.module.scss";

type PageLayoutTypes = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutTypes) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<ResponseType>(
    ["data"],
    getData,
    {
      onSuccess: (data) => {
        setIsAllActive(data.isAllActive ?? true);
      },
    }
  );
  const { mutate } = useMutation(changeData, {
    onSuccess: async (data) => {
      queryClient.setQueryData(["data"], () => ({
        ...data,
        isAllActive: data.isAllActive,
      }));
    },
  });
  const [isAllActive, setIsAllActive] = useState(true);

  if (isLoading) {
    return (
      <Center className={styles.main}>
        <Spinner />
      </Center>
    );
  }
  if (isError || !data) {
    return (
      <Center className={styles.main}>
        <Text>Error</Text>
      </Center>
    );
  }

  const handleClick = () => {
    mutate({ ...data, isAllActive: !isAllActive });
    setIsAllActive(!isAllActive);
  };

  return (
    <main className={styles.main}>
      <Center className={styles.sidebar}>
        <Heading as="h2" size="xl">
          Data<span>Guard</span>
        </Heading>
        <Navigation tabdata={data.tabdata} tabs={data.tabs} />
        <Stack
          direction="row"
          spacing="25px"
          className={`${styles.gradient} ${
            isAllActive ? styles.bgActive : styles.bgBlocked
          }`}
        >
          <Text>All plugins enabled</Text>
          <Switch
            colorScheme="green"
            size="lg"
            isChecked={isAllActive}
            onChange={handleClick}
          />
        </Stack>
      </Center>
      <Center className={styles.content}>
        <PluginList data={data}>{children}</PluginList>
      </Center>
    </main>
  );
}
