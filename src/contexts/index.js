import React from "react";
import { LoginContext, LoginProvider } from "./common/LoginContext";
import { LayoutContext, LayoutProvider } from "./common/LayoutContext";
import { UserContext, UserProvider } from "./profile/ProfileContext";
import { SlotsContext, SlotsProvider } from "./dependants/slots/Slots";

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  UserContext,
  UserProvider,
  SlotsContext,
  SlotsProvider
};

export const ContextManager = props => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <UserProvider>
          <SlotsProvider>
          {children}
          </SlotsProvider>
        </UserProvider>
      </LoginProvider>
    </LayoutProvider>
  );
};
