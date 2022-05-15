import React, { memo } from "react";
import styled from "styled-components";
import { animated, useSpring, a } from "react-spring";
import { useMeasure, usePrevious } from "../utils/helpers";
import Icon from "./Icon";
import Label from "./Label";
import Button from "./Button";

const ExpandButton = styled(Button).attrs(() => ({
  transparent: true
}))`
  padding: 0 0.5rem;
  margin-left: -0.75rem;
  &:hover,
  &:focus,
  &:active,
  &:focus:hover,
  &:focus:active {
    background-color: transparent;
  }
`;
const ExpandIcon = styled(Icon).attrs(() => ({
  name: "chevron-right"
}))`
  vertical-align: middle;
  transform: rotate(${({ expanded }) => (expanded ? 90 : 0)}deg);
  transition: 200ms;
`;
const StyledLabel = styled(Label)`
  margin-bottom: -0.25rem;
  cursor: move;
`;
const Actions = styled.div``;

const TreeHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: move;
`;
const TreeHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: -2px;
  padding: 0.75rem 0;
  height: 3.5rem;
`;
const TreeHeaderDescription = styled.div`
  margin-top: 0.375rem;
  transition: 200ms;
  margin-bottom: ${({ expanded }) => (expanded ? `-1.5rem` : `-0.5rem`)};
  opacity: ${({ expanded }) => (expanded ? `0` : `1`)};
`;
const TreeContentWrap = styled(animated.div)`
  margin-left: 0.25rem;
  box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.color.border},
    ${({ theme, type }) =>
      type === "danger"
        ? `inset 2px 0 0 0 ${theme.color.danger["500"]}`
        : type === "success"
        ? `inset 2px 0 0 0 ${theme.color.success["500"]}`
        : `inset 1px 0 0 0 ${theme.color.border}`};
  overflow: hidden;
  transition: 200ms;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: ${({ single }) =>
    single ? `calc(100% - 0.25rem)` : `calc(100% + 0.75rem)`};
`;
const TreeContent = styled(a.div)`
  position: relative;
`;
const TreeWrap = styled.div``;

const Tree = memo(
  ({
    children,
    actions,
    label,
    description,
    expanded,
    onExpandToggle,
    single,
    type,
    onHeaderMouseEnter,
    onHeaderMouseLeave
  }) => {
    const previous = usePrevious(expanded);
    const [bind, { height: viewHeight }] = useMeasure();
    const { opacity, transform } = useSpring({
      from: { opacity: 0, transform: "translate3d(0, 0, 0)" },
      to: {
        opacity: expanded ? 1 : 0,
        transform: `translate3d(${expanded ? 0 : "0"}, 0, 0)`
      }
    });
    const { height } = useSpring({
      config: {
        mass: 1,
        tension: 1000,
        friction: 10,
        clamp: true
      },
      from: { height: 0 },
      to: { height: expanded ? viewHeight : 1 }
    });

    return (
      <TreeWrap>
        <TreeHeader>
          <ExpandButton
            onClick={onExpandToggle}
            onMouseEnter={onHeaderMouseEnter}
            onMouseLeave={onHeaderMouseLeave}
          >
            <ExpandIcon expanded={expanded} />
          </ExpandButton>
          <TreeHeaderText
            onClick={onExpandToggle}
            expanded={expanded}
            onMouseEnter={onHeaderMouseEnter}
            onMouseLeave={onHeaderMouseLeave}
          >
            {label && <StyledLabel>{label}</StyledLabel>}
            {description && (
              <TreeHeaderDescription expanded={expanded}>
                {description}
              </TreeHeaderDescription>
            )}
          </TreeHeaderText>
          {actions && <Actions>{actions()}</Actions>}
        </TreeHeader>
        <TreeContentWrap
          expanded={expanded}
          single={single}
          style={{
            height: expanded && previous === expanded ? "auto" : height,
            marginTop: expanded ? "-0.5rem" : "0"
          }}
          type={type}
        >
          <TreeContent
            style={{ transform, opacity }}
            {...bind}
            children={children}
          />
        </TreeContentWrap>
      </TreeWrap>
    );
  }
);

export default Tree;
