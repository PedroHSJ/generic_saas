import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {
  Strategy,
  VerifyCallback,
  GoogleCallbackParameters,
} from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  "google",
  5, // INFORMA informa ao NestJS quantos parâmetros sua função validate espera – isso evita problemas com a sobrecarga dos construtores da estratégia
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile", "openid"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    params: GoogleCallbackParameters,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Extraia as informações necessárias do perfil do usuário
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
      idToken: params.id_token,
      expiresIn: params.expires_in,
    };
    const userExists = await this.authService.validateGoogleUser({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      picture: user.picture,
      password: "",
      isGoogleLogin: true,
    });
    done(null, userExists);
  }
}
