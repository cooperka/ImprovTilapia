// https://github.com/react-navigation/react-navigation/issues/962#issuecomment-321761053
function findCurrRouteName(navState) {
  if (navState.index !== undefined) {
    return findCurrRouteName(navState.routes[navState.index]);
  }
  return navState.routeName;
}

export function getCurrRouteName(navigation) {
  return findCurrRouteName(navigation.state);
}
