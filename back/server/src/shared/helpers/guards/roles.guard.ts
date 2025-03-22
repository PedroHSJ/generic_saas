import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { I18nService } from "nestjs-i18n";
import { RolesGuardRequest } from "src/shared/interfaces/rolesGuardRequest.interface";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(I18nService)
    private readonly i18n: I18nService,
    private reflector: Reflector,
  ) {}

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const features = this.reflector.get<string[]>(
      "features",
      executionContext.getHandler(),
    );
    console.log("RolesGuard -> features", features);
    const scopes = this.reflector.get<string[]>(
      "scopes",
      executionContext.getHandler(),
    );
    console.log("RolesGuard -> scopes", scopes);
    const request = executionContext
      .switchToHttp()
      .getRequest<RolesGuardRequest>();

    if (!features) {
      console.log("no features");
      return true;
    }

    if (features.includes("OPEN")) {
      console.log("OPEN");
      return true;
    }

    // if (!request.context) {
    //   throw new ForbiddenException(
    //     this.i18n.translate("events.permission.notEnoughContext"),
    //   );
    // }
    // const {
    //   instanceId: contextInstanceId,
    //   establishmentId: contextEstablishmentId,
    // } = request.context;

    // const testContext = this.compareContextToParams(scopes, {
    //   establishmentId: contextInstanceId,
    //   instanceId: contextEstablishmentId,
    // });
    // if (!testContext)
    //   throw new ForbiddenException(
    //     this.i18n.translate("events.permission.notEnoughContext"),
    //   );

    // const features: string[] = request.features;
    // const hasRole: boolean = roles.every((role) => features.includes(role));

    // if (!hasRole) {
    //   throw new ForbiddenException(
    //     this.i18n.translate("events.permission.notEnoughPrivileges"),
    //   );
    // }

    return true;
  }

  private compareContextToParams(
    scopes: string[],
    context: {
      instanceId: string | null;
      establishmentId: string | null;
    },
  ): boolean {
    return scopes.some((scope) => {
      switch (scope) {
        case "global":
          return true;

        case "instance":
          return context.instanceId !== null;

        case "establishment":
          return context.establishmentId !== null;
      }
      return false;
    });
  }
}
