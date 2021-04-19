import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {debounce} from 'lodash';
import { useRouter } from 'next/router'
import {
  getsUserInfoAction,
  addFavoriteAction,
  cancelFavoriteAction
} from '~/store/user/actionCreators'

import { message } from 'antd'

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


export const useFavoriteList = (id) => {

  const {
    userInfo,
  } = useSelector(state => ({
    userInfo: state.getIn(["user", "userInfo"])
  }), shallowEqual)

  const [ isFavorite, setIsFavorite ] = useState(false)
  const isFavoriteRef = useRef(isFavorite)

  useEffect(() => {
    const favoriteList = userInfo.favorite ? userInfo.favorite : []
    const value = favoriteList.indexOf(id) !== -1
    setIsFavorite(value)
    isFavoriteRef.current = value
  }, [userInfo, id])

  // useEffect(() => {
  //   debouncedSave && debouncedSave.cancel()
  // }, [id])

  const dispatch = useDispatch()

  const debouncedSave = useRef(debounce((nextValue, id) => {
    // console.log(id)
    // 判斷值有沒有被改變
    if(isFavoriteRef.current === nextValue) return
    
    // 如果被改變有兩種情況
    // 1.加入
    if(nextValue === true) {
      dispatch(addFavoriteAction(id))
    } else {
      // 2.取消
      dispatch(cancelFavoriteAction(id))
    }
    
    isFavoriteRef.current = nextValue

  }, 300))
		.current;

  const clickFavorite = useCallback(async (preValue) => {
    if(Object.keys(userInfo).length === 0 ) return message.warning('請先登錄')
    setIsFavorite(!isFavorite)
		debouncedSave(!isFavorite, id);
  }, [userInfo, isFavorite, id])

  return [isFavorite, clickFavorite]
}