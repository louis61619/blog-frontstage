import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  getUserSessinAction,
  getUserInfoAction,
} from "~/store/user/actionCreators";

export default memo(function Auth(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [])

  return <Fragment>{props.children}</Fragment>;
});
