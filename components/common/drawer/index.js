import React, { memo, useState, forwardRef, useImperativeHandle, useEffect, createContext } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { Drawer, Button, Input, Avatar, Menu, Dropdown } from "antd";

export default memo(function Drawer() {

  useImperativeHandle(ref, () => ({
    showDrawer,
  }));

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      
    </div>
  )
})
