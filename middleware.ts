import pipeMiddleware from "./middleware/pipeMiddleware";
import authMiddleware from "./middleware/authMiddleware";

export default pipeMiddleware([
  authMiddleware,
]);

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
}