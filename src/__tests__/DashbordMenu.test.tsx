import { screen } from "@testing-library/react";
import { render } from "../app/utility/test-utils";
import userEvent from "@testing-library/user-event";
import DashboardMenu from "src/app/Dashboard/DashboardMenu";
import { DashboardMenuData } from "src/app/Dashboard/DashboardMenu";
describe("DashboardMenu", () => {
  test("render list correctly", () => {
    const handleDrawerClose = jest.fn();
    render(
      <DashboardMenu handleDrawerClose={handleDrawerClose} open={false} />
    );
    const DashboardMenuList = screen.getAllByRole("listitem");
    expect(DashboardMenuList).toHaveLength(DashboardMenuData.length + 1);
    const DashboardMenuImage = screen.getByRole("img");
    expect(DashboardMenuImage).toBeInTheDocument();
    const closeDrawerIcon = screen.getByTestId("CloseIcon");
    expect(closeDrawerIcon).toBeInTheDocument();
  });
  test("close drawer", async () => {
    const user = userEvent.setup();
    const handleDrawerClose = jest.fn();

    render(
      <DashboardMenu handleDrawerClose={handleDrawerClose} open={false} />
    );
    const closeDrawerIcon = screen.getByTestId("CloseIcon");
    await user.click(closeDrawerIcon);
    expect(handleDrawerClose).toHaveBeenCalledTimes(1);
  });
});
