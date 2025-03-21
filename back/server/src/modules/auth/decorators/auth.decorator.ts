import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard("jwt")),
    UseGuards(AuthGuard("google")),
    ApiBearerAuth("JWT-auth"),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
  );
}
