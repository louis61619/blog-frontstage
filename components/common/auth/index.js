import React, { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Provider } from 'next-auth/client'

import {
  getUserSessinAction,
  getUserInfoAction,
  changeVisitsCheckedAction,
} from "~/store/user/actionCreators";

import {
  getAdminInfoAction
} from '~/store/admin/actionCreators'

export default memo(function Auth(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoAction());
    dispatch(getAdminInfoAction())
    dispatch(changeVisitsCheckedAction())
  }, [])

  return <Provider session={props.session} >{props.children}</Provider>;
});
