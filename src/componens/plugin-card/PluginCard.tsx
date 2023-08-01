"use client";

import {
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Card,
  Text,
  Switch,
  FormControl,
} from "@chakra-ui/react";
import styles from "./PluginCard.module.scss";
import { ParsedPlugin } from "@/helpers/types";
import { useState } from "react";

type PluginCard = {
  plugin: ParsedPlugin;
  onChange: (isActive: boolean, title: string) => void;
  isAllActive?: boolean;
};
export default function PluginCard({
  plugin,
  onChange,
  isAllActive,
}: PluginCard) {
  const [isActive, setIsActive] = useState(plugin.active);

  const handleSwitch = () => {
    setIsActive(() => !isActive);
    onChange(!isActive, plugin.id);
  };
  return (
    <Card
      border="2px solid lightgrey"
      className={
        plugin.inactive || !(isAllActive ?? true) ? styles.inactive : ""
      }
    >
      <CardHeader mb="-15px">
        <SimpleGrid columns={2} spacing={5}>
          <Heading size="md" fontWeight="400" color="rgb(11 52 75)">
            {plugin.title}
          </Heading>
          <FormControl as={SimpleGrid} columns={1} textAlign="right">
            <Switch
              colorScheme="green"
              size="lg"
              isChecked={isActive}
              id="switch"
              isDisabled={plugin.inactive}
              onChange={handleSwitch}
            />
            <label
              htmlFor="switch"
              className={styles.label}
              style={{ color: isActive ? "green" : "red" }}
            >
              {isActive ? "Allowed" : "Blocked"}
            </label>
          </FormControl>
        </SimpleGrid>
      </CardHeader>
      <CardBody mr="20%" pt="0">
        <Text color="grey">{plugin.description} </Text>
      </CardBody>
    </Card>
  );
}
