// src/__tests__/AdminLayout.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

// Mock SweetAlert2 to avoid actual UI dialogs
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
}));

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useLocation: () => ({ pathname: "/admin/dashboard" })
  };
});

describe("AdminLayout dropdown behavior", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  test("opens notifications dropdown on button click", async () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );
    const notifBtn = screen.getByRole("button", { name: /notifications/i });
    fireEvent.click(notifBtn);
    await waitFor(() => {
      expect(screen.getByText(/alerts center/i)).toBeInTheDocument();
    });
  });

  test("opens profile dropdown and closes notifications", async () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );
    const notifBtn = screen.getByRole("button", { name: /notifications/i });
    fireEvent.click(notifBtn);
    await waitFor(() => {
      expect(screen.getByText(/alerts center/i)).toBeInTheDocument();
    });
    const profileBtn = screen.getByText(/alex thompson/i).closest("button");
    fireEvent.click(profileBtn);
    await waitFor(() => {
      expect(screen.queryByText(/alerts center/i)).not.toBeInTheDocument();
      expect(screen.getByText(/alex.thompson@legal.com/i)).toBeInTheDocument();
    });
  });

  test("clicking outside closes open dropdown", async () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );
    const notifBtn = screen.getByRole("button", { name: /notifications/i });
    fireEvent.click(notifBtn);
    await waitFor(() => {
      expect(screen.getByText(/alerts center/i)).toBeInTheDocument();
    });
    // Click on body element to simulate outside click
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText(/alerts center/i)).not.toBeInTheDocument();
    });
  });
});
