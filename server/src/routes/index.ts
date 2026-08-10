import { Router } from "express";
import { AuthRoutes } from "../controllers/auth/auth.route.js";
import { UserRoutes } from "../controllers/user/user.route.js";
import { CategoryRoutes } from "../controllers/category/category.route.js";
import { PlantRoutes } from "../controllers/plant/plant.route.js";
import { GardenRoutes } from "../controllers/garden/garden.route.js";
import { UserPlantRoutes } from "../controllers/userPlant/userPlant.route.js";
import { CareScheduleRoutes } from "../controllers/careSchedule/careSchedule.route.js";
import { PostRoutes } from "../controllers/post/post.route.js";
import { ListingRoutes } from "../controllers/listing/listing.route.js";
import { CommentRoutes } from "../controllers/comment/comment.route.js";
import { PostLikeRoutes } from "../controllers/postLike/postLike.route.js";
import { TransactionRoutes } from "../controllers/transaction/transaction.route.js";
import { ExchangeRequestRoutes } from "../controllers/exchangeRequest/exchangeRequest.route.js";
import { ReviewRoutes } from "../controllers/review/review.route.js";
import { WishlistRoutes } from "../controllers/wishlist/wishlist.route.js";
import { NotificationRoutes } from "../controllers/notification/notification.route.js";
import { ReportRoutes } from "../controllers/report/report.route.js";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/plants", route: PlantRoutes },
  { path: "/gardens", route: GardenRoutes },
  { path: "/user-plants", route: UserPlantRoutes },
  { path: "/care-schedules", route: CareScheduleRoutes },
  { path: "/posts", route: PostRoutes },
  { path: "/listings", route: ListingRoutes },
  { path: "/comments", route: CommentRoutes },
  { path: "/likes", route: PostLikeRoutes },
  { path: "/transactions", route: TransactionRoutes },
  { path: "/exchanges", route: ExchangeRequestRoutes },
  { path: "/reviews", route: ReviewRoutes },
  { path: "/wishlists", route: WishlistRoutes },
  { path: "/notifications", route: NotificationRoutes },
  { path: "/reports", route: ReportRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
