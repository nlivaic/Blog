export const saveState = state => {
  const serializedAccount = JSON.stringify({ account: state.account });
  localStorage.setItem("state", serializedAccount);
};

export const loadState = () => {
  try {
    const state = localStorage.getItem("state");
    if (!state) {
      return undefined;
    }
    return JSON.parse(state);
  } catch {
    return undefined;
  }
};
