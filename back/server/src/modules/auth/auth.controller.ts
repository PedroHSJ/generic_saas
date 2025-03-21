import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Inject,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Public } from "src/shared/helpers/decorators/public.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { Response } from "express";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  // Rota que inicia o fluxo de autenticação com o Google
  @Public()
  @ApiOperation({
    summary: "Google Auth",
    description: "Initiate Google authentication flow",
  })
  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleAuth() {
    // Essa rota não precisa de lógica, o Passport redireciona para o Google
  }

  // Callback do Google
  @Public()
  @ApiOperation({
    summary: "Google Auth Redirect",
    description: "Handle Google authentication callback",
  })
  @ApiOkResponse({
    description: "Redirect to login page",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @Get("google/redirect")
  @UseGuards(AuthGuard("google"))
  //@ApiExcludeEndpoint()
  async googleAuthRedirect(
    @Request() req: Request,
    @Res() res: Response,
  ) {
    const { access_token } = await this.authService.loginGoogle(
      req.user.id,
    );

    res.redirect(
      `http://localhost:5173/login?token=${access_token}`.trim(),
    );
  }

  @Public()
  @ApiHeader({
    name: "Accept-Language",
    description: "Language",
    example: "en-US",
  })
  //@ApiExcludeEndpoint()
  @Post()
  async auth(@Body() body: LoginDto) {
    // return this.authService.auth({
    //   email: body.email,
    //   pass: body.password,
    // });
    return;
  }
}
