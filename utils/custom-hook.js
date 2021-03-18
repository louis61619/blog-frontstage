import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

export const useDebouncedEffect = (effect, delay, deps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export const useCheckLogin = () => {
  const {
    userInfo,
  } = useSelector(state => ({
    userInfo: state.getIn(["user", "userInfo"])
  }), shallowEqual)

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const loginStatus = Object.keys(userInfo).length? true: false
    setIsLogin(loginStatus)
  }, [userInfo, setIsLogin])

  return [isLogin, userInfo]
};
