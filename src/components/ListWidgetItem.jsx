import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Tree from "./Tree";

import { Menu, MenuItem } from "./Menu";

const ListItem = styled.div`
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
`;
const ListIconActions = styled.div`
  margin-right: -0.5rem;
`;
const AddNewHoverZone = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const AddNewIconButton = styled(Button)`
  line-height: 1;
  padding: 0 0.75rem;
  &,
  &:hover,
  &:active:hover,
  &:focus,
  &:focus:hover {
    background-color: ${({ theme }) => theme.color.surface};
  }
  transition: 200ms;
  transform: scale(0);

  ${AddNewHoverZone}:hover & {
    transform: scale(1);
  }
`;

const ListWidgetItem = ({
  itemExpanded,
  labelSingular,
  index,
  item,
  fields,
  onDelete,
  onAddAfterClick,
  handleChange,
  toggleExpand,
  last
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [treeType, setTreeType] = useState(null);

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <ListItem>
      <Tree
        onExpandToggle={() => toggleExpand(index)}
        expanded={itemExpanded}
        label={`${labelSingular} ${index + 1}`}
        description={!!Object.keys(item).length && item[Object.keys(item)[0]]}
        type={treeType}
        onHeaderMouseEnter={() => setTreeType("success")}
        onHeaderMouseLeave={() => setTreeType(null)}
        actions={() => (
          <ListIconActions>
            <Button
              icon="more-horizontal"
              expanded={itemExpanded}
              onClick={handleOpenMenu}
            />
            <Button
              icon="x"
              type="danger"
              expanded={itemExpanded}
              onMouseEnter={() => setTreeType("danger")}
              onMouseLeave={() => setTreeType(null)}
              onClick={() => onDelete(index)}
            />
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
              <MenuItem icon="arrow-up" onClick={handleClose}>
                Move up
              </MenuItem>
              <MenuItem icon="arrow-down" onClick={handleClose}>
                Move down
              </MenuItem>
              <MenuItem icon="plus-circle" onClick={handleClose}>
                Add new above
              </MenuItem>
              <MenuItem icon="plus-circle" onClick={handleClose}>
                Add new below
              </MenuItem>
              <MenuItem
                icon="copy"
                onClick={handleClose}
                onMouseEnter={() => setTreeType("success")}
                onMouseLeave={() => setTreeType(null)}
              >
                Duplicate
              </MenuItem>
              <MenuItem
                icon="trash-2"
                onClick={() => {
                  onDelete(index);
                  handleClose();
                }}
                onMouseEnter={() => setTreeType("danger")}
                onMouseLeave={() => setTreeType(null)}
                type="danger"
              >
                Delete
              </MenuItem>
            </Menu>
          </ListIconActions>
        )}
      >
        {fields && fields(handleChange, index)}
      </Tree>
      {!last && (
        <AddNewHoverZone>
          <AddNewIconButton
            icon="plus-circle"
            onClick={() => onAddAfterClick(index)}
            iconSize="1.5rem"
          />
        </AddNewHoverZone>
      )}
    </ListItem>
  );
};

export default ListWidgetItem;
