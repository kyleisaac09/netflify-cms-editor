import React from "react";
import styled from "styled-components";
import color from "color";
import Icon from "../Icon";

export const MenuItemWrap = styled.div`
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: 200ms;
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.highEmphasis};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.elevatedSurfaceHighlight};
    ${({ theme, type }) =>
      type === "danger"
        ? `
      background-color: ${color(theme.color.danger["500"])
        .alpha(0.2)
        .string()};
      color: ${theme.color.danger[theme.darkMode ? "300" : "800"]};
    `
        : ``}
    ${({ theme, type }) =>
      type === "success"
        ? `
        background-color: ${color(theme.color.success["500"])
          .alpha(0.2)
          .string()};
      color: ${theme.color.success[theme.darkMode ? "300" : "800"]};
    `
        : ``}
  }
  ${({ theme }) => theme.responsive.mediaQueryDown("xs")} {
    color: ${({ theme, type }) =>
      type === "danger"
        ? theme.color.danger[theme.darkMode ? "300" : "800"]
        : type === "success"
        ? theme.color.success[theme.darkMode ? "300" : "800"]
        : theme.color.highEmphasis};
  }
`;

const TextWrap = styled.div`
  flex: 1;
`;

const StyledIcon = styled(Icon)`
  margin-right: 0.75rem;
`;
const SelectedIcon = styled(Icon)`
  margin-left: 0.75rem;
`;

const MenuItem = ({
  children,
  icon,
  onClick,
  selected,
  type,
  className,
  ...props
}) => (
  <MenuItemWrap onClick={onClick} type={type} className={className} {...props}>
    {icon && <StyledIcon name={icon} />}
    <TextWrap>{children}</TextWrap>
    {selected && <SelectedIcon name="check" />}
  </MenuItemWrap>
);

export default MenuItem;
