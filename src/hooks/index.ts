import { useContext } from "react";
import { ThemeContext } from "../context/theme";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { SocketContext } from "../context/socket";
import { Socket } from "socket.io-client";

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};
