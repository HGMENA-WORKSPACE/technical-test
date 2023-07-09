import { createStore } from "redux";

interface Actions {
  type: "COMPLETE" | "INITIAL";
}

export const store = createStore((state = false, action: Actions) => {
  switch (action.type) {
    case "COMPLETE":
      state = true;
      return state;
    default:
      return state;
  }
});
