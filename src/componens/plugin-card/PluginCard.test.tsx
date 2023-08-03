import { render, fireEvent, screen } from "@testing-library/react";
import PluginCard from "./PluginCard";

const plugin = {
  title: "Plugin 6",
  description: "Qui cillum velit elit incididunt excepteur nostrud occaecat.",
  active: true,
  inactive: false,
  id: "plugin6",
};
const props = {
  plugin,
  onChange: () => {},
  isAllActive: false,
};

test("loads plugins", async () => {
  render(<PluginCard {...props} />);

  expect(screen.getByLabelText("Allowed")).toBeInTheDocument();
});

test("checkbox is working", async () => {
  render(<PluginCard {...props} />);
  expect(screen.getByRole("checkbox")).toBeChecked();

  fireEvent.click(screen.getByRole("checkbox"));

  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("class inactive", async () => {
  const res = render(<PluginCard {...props} />);

  expect(res.container.querySelector("#plugin-card")).toHaveClass("inactive");
});
test("class active", async () => {
  const res = render(<PluginCard {...props} isAllActive={true} />);

  expect(res.container.querySelector("#plugin-card")).not.toHaveClass("inactive");
});
