import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Signup from "../../../pages/auth/Signup";
import { GlobalProviders } from "../../App.test";

describe("Signup component", () => {
  test("should render", () => {
    render(<Signup />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });
});