import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./shared/modules/database/database.module";
import { LanguageModule } from "./shared/modules/language/i18n.module";
import { NutritionistModule } from "./modules/nutritionist/nutritionist.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GoogleStrategy } from "./modules/auth/strategy/google.strategy";
import { AuthService } from "./modules/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { JwtStrategy } from "./modules/auth/strategy/jwt.strategy";
import { JwtAuthGuard } from "./shared/helpers/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LanguageModule,
    UserModule,
    //NutritionistModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    GoogleStrategy,
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
