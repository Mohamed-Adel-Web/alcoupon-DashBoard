import { screen } from "@testing-library/react";
import { render } from "../app/utility/test-utils";
import userEvent from "@testing-library/user-event";
import Heading from "src/app/Dashboard/DashboardSharedComponent/Heading";
describe("Heading test", () => {
  test("render correctly", () => {
    const handleOpenModal = jest.fn();
    render(
      <Heading
        title={"stores"}
        buttonTitle="add new store"
        handleOpen={handleOpenModal}
      />
    );
    const headTitle = screen.getByRole("heading", { name: "stores" });
    expect(headTitle).toBeInTheDocument();
    const buttonTitle = screen.getByRole("button", { name: "add new store" });
    expect(buttonTitle).toBeInTheDocument();
  });
  test("modal open", async () => {
    const user = userEvent.setup();
    const handleOpenModal = jest.fn();
    render(
      <Heading
        title={"stores"}
        buttonTitle="add new store"
        handleOpen={handleOpenModal}
      />
    );
    const buttonTitle = screen.getByRole("button", { name: "add new store" });
    await user.click(buttonTitle);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
