import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from 'next/router'

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


export const useLoadingSkeleton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      )
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, []);

  return [loading]
}