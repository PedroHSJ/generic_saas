import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "src/shared/interfaces/jwtPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "secretKey",
      signOptions: {
        algorithm: "HS256",
        expiresIn: "60m",
      },
    });
  }

  async validate(payload: IJwtPayload) {
    return { userId: payload.id, cpf: payload.cpf };
  }
}
