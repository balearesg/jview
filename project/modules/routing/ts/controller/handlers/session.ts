export async function SessionHandler(route: string) {
  if (route === "/") {
    return { pathname: "home-jview" };
  }

  return true;
}
