import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RolesGuard } from "../guards/roles.guard";

export enum ScopesEnum {
  GLOBAL = "GLOBAL",
  ESTABLISHMENT = "ESTABLISHMENT",
}

export enum FeaturesEnum {
  OPEN = "OPEN",
  USER_LIST = "USER_LIST",
}

export function Auth(scopes: ScopesEnum[], features: FeaturesEnum[]) {
  return applyDecorators(
    SetMetadata("features", features),
    SetMetadata("scopes", scopes),
    UseGuards(AuthGuard("jwt"), RolesGuard),
    ApiBearerAuth("JWT-auth"),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
  );
}
