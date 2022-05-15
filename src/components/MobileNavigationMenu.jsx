import React, { useState } from "react";
import styled from "styled-components";
import color from "color";
import { Transition } from "react-transition-group";

import Icon from "./Icon";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import NavigationMenuItem from "./NavigationMenuItem";
import { Menu, MenuItem } from "./Menu";

const NavWrap = styled.div`
  height: 3.5rem;
`;
const Nav = styled.div`
  background-color: ${({ theme }) => theme.color.elevatedSurface};
  box-shadow: 0 -2px 4px 0 ${({ theme }) => (theme.darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(121, 130, 145, 0.2)")};
  height: 3.5rem;
  display: flex;
  padding: 4px;
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  width: 100%;
  @media (display-mode: standalone) {
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(env(safe-area-inset-bottom) + 3.5rem);
  }
`;
const NavIconButtonWrap = styled.button`
  margin: 4px;
  flex: 1;
  padding: 0;
  position: relative;
  background-color: ${({ active, theme }) =>
    active
      ? color(theme.color.success["500"])
          .alpha(0.2)
          .string()
      : "transparent"};
  border: 0;
  border-radius: 6px;
  color: ${({ active, theme }) =>
    active ? theme.color.primary["500"] : theme.color.highEmphasis};
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background-color: ${({ active, theme }) =>
      active
        ? color(theme.color.success["500"])
            .alpha(0.3)
            .string()
        : theme.color.surfaceHighlight};
  }
`;
const IconWrap = styled.span`
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${({ active }) => (active ? "-100%" : "0")});
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
const ActiveIconWrap = styled(IconWrap)`
  transform: translateY(${({ active }) => (active ? "0" : "100%")});
`;

const MenuWrap = styled.div`
  background-color: ${({ theme }) => theme.color.surface};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  height: calc(
    100vh - 3.5rem
  ); /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100 - 3.5rem);
  /* height: calc(100vh - 3.5rem); */
  z-index: 199;
  transition: 250ms;
  ${({ state, theme }) => {
    switch (state) {
      case "entering":
        return `background-color: transparent;`;
      case "entered":
        return `background-color: ${theme.color.surface};`;
      case "exiting":
        return `background-color: transparent;`;
      case "exited":
        return `background-color: transparent;`;
      default:
        return ``;
    }
  }}
`;
const ToolbarWrap = styled.div`
  background-color: ${({ theme }) => theme.color.elevatedSurface};
  box-shadow: 0 2px 4px 0
    ${({ theme }) =>
      theme.darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(121, 130, 145, 0.2)"};
  height: 3.5rem;
  display: flex;
  position: relative;
  z-index: 100;
  transform: translateY(0);
  transition: 250ms;
  @media (display-mode: standalone) {
    padding-top: env(safe-area-inset-top);
    height: calc(env(safe-area-inset-top) + 3.5rem);
  }
  ${({ state }) => {
    switch (state) {
      case "entering":
        return `transform: translateY(-100%);`;
      case "entered":
        return `transform: translateY(0);`;
      case "exiting":
        return `transform: translateY(-100%);`;
      case "exited":
        return `transform: translateY(-100%);`;
      default:
        return ``;
    }
  }}
`;
const SiteNameWrap = styled.div`
  flex: 1;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
`;
const SiteName = styled.div`
  color: ${({ theme }) => theme.color.highEmphasis};
  font-weight: bold;
  margin-right: 12px;
`;
const UserMenuWrap = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;

const MenuContent = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  transform: translateY(0);
  transition: 250ms;
  ${({ state }) => {
    switch (state) {
      case "entering":
        return `transform: translateY(64px); opacity: 0;`;
      case "entered":
        return `transform: translateY(0); opacity: 1;`;
      case "exiting":
        return `transform: translateY(64px); opacity: 0;`;
      case "exited":
        return `transform: translateY(64px); opacity: 0;`;
      default:
        return ``;
    }
  }}
`;
const NavTop = styled.div`
  flex: 1;
`;
const NavBottom = styled.div``;

const StyledLogo = styled(Logo)`
  margin: 1rem;
`;
StyledLogo.defaultProps = {
  size: "1.5rem",
  colored: true
};

const MobileNavigationBar = ({ darkMode, setDarkMode }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  return (
    <NavWrap>
      <Nav>
        <NavIconButton
          icon="menu"
          active={openMenu}
          onClick={() => {
            console.log("clicked");
            setOpenMenu(!openMenu);
          }}
          hasSubmenu
        />
        <NavIconButton icon="search" />
        <NavIconButton
          icon="plus-circle"
          onClick={() => setAddMenuOpen(true)}
        />
        <NavIconButton icon="bell" />
        <NavIconButton icon="settings" />
      </Nav>
      <Menu open={addMenuOpen} onClose={() => setAddMenuOpen(false)}>
        <MenuItem icon="edit-3" onClick={() => setAddMenuOpen(false)}>
          New Post
        </MenuItem>
        <MenuItem icon="inbox" onClick={() => setAddMenuOpen(false)}>
          New Post Category
        </MenuItem>
        <MenuItem icon="file-text" onClick={() => setAddMenuOpen(false)}>
          New Page
        </MenuItem>
        <MenuItem icon="shopping-cart" onClick={() => setAddMenuOpen(false)}>
          New Product
        </MenuItem>
        <MenuItem icon="package" onClick={() => setAddMenuOpen(false)}>
          New Product Category
        </MenuItem>
        <MenuItem icon="users" onClick={() => setAddMenuOpen(false)}>
          New Author
        </MenuItem>
        <MenuItem icon="calendar" onClick={() => setAddMenuOpen(false)}>
          New Event
        </MenuItem>
      </Menu>
      <Transition in={openMenu} timeout={{ enter: 0, exit: 250 }} unmountOnExit>
        {state => (
          <MenuWrap state={state}>
            <ToolbarWrap state={state}>
              <StyledLogo />
              <SiteNameWrap>
                <SiteName>My Website</SiteName>
                <Icon name="external-link" size="sm" />
              </SiteNameWrap>
              <UserMenuWrap>
                <UserMenu darkMode={darkMode} setDarkMode={setDarkMode} />
              </UserMenuWrap>
            </ToolbarWrap>
            <MenuContent state={state}>
              <NavTop>
                <NavigationMenuItem icon="edit-3" label="Posts" active />
                <NavigationMenuItem icon="inbox" label="Post Categories" />
                <NavigationMenuItem icon="file-text" label="Pages" />
                <NavigationMenuItem icon="shopping-cart" label="Products" />
                <NavigationMenuItem icon="package" label="Product Categories" />
                <NavigationMenuItem icon="users" label="Authors" />
                <NavigationMenuItem icon="calendar" label="Events" />
                <NavigationMenuItem icon="image" label="Media" />
              </NavTop>
              <NavBottom>
                <NavigationMenuItem
                  icon="bar-chart"
                  label="Analytics"
                  externalLink
                />
                <NavigationMenuItem
                  icon="server"
                  label="Product Categories"
                  externalLink
                />
                <NavigationMenuItem
                  icon="github"
                  label="GitHub Repository"
                  externalLink
                />
                <NavigationMenuItem icon="settings" label="Settings" />
              </NavBottom>
            </MenuContent>
          </MenuWrap>
        )}
      </Transition>
    </NavWrap>
  );
};

const NavIconButton = ({ active, icon, hasSubmenu, ...props }) => {
  return (
    <NavIconButtonWrap active={active} {...props}>
      <IconWrap active={active}>
        <Icon name={icon} />
      </IconWrap>
      {hasSubmenu && (
        <ActiveIconWrap active={active}>
          <Icon name="chevron-down" />
        </ActiveIconWrap>
      )}
    </NavIconButtonWrap>
  );
};

export default MobileNavigationBar;
