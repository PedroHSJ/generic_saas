import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { I18nService } from "nestjs-i18n";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    @Inject(I18nService)
    private readonly i18n: I18nService,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) return true;

      // Verificação de Token JWT
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(" ")[1];
      console.log(token);
      if (!token)
        throw new UnauthorizedException(
          this.i18n.t("events.commons.notFoundToken"),
        );

      const re = await this.authService.verifyToken(token);
      console.log(re);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
}
