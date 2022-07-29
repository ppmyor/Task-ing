import { LOGIN_USER } from "./types";
import axios from "axios";

export function loginUser(dataToSubmit) {
  // api? post? get?
  const request = axios.post("/api", dataToSubmit).then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
