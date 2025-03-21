// import { Inject, Injectable, NestMiddleware, Next } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import { UserDto } from 'src/modules/users/dto/user.dto';
// import { UserService } from 'src/modules/users/user.service';
// import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
// import { ConfigService } from '@nestjs/config';
// import { join } from 'path';
// import { JwtService } from '@nestjs/jwt';
// import * as fs from 'fs';
// import { plainToInstance } from 'class-transformer';
// import { ContextAndResourcesDTO } from 'src/modules/auth/dto/context_and_resources.dto';
// @Injectable()
// export class UserMiddleware implements NestMiddleware {
//   constructor(
//     @Inject(UserService)
//     private readonly userService: UserService,
//     @Inject(ConfigService)
//     private readonly configService: ConfigService,
//     @Inject(JwtService)
//     private jwtService: JwtService,
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const user = await this.getUserFromRequest(req);
//     req.user = plainToInstance(UserDto, user);
//     const context_and_resources = await this.getContextFromRequest(req);
//     if (!context_and_resources) {
//       req.context = null;
//       req.resources = [];
//       next();
//       return;
//     }
//     req.context = context_and_resources.context;
//     req.resources = context_and_resources.resources;

//     next();
//   }

//   private async getUserFromRequest(req: Request): Promise<UserDto | null> {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return null;
//     }

//     try {
//       const decoded = jwt.decode(token) as JwtPayload;

//       if (decoded.cpf) {
//         return await this.userService.findOneByCpf(decoded.cpf);
//       } else {
//         return null;
//       }
//     } catch (err) {
//       Next;
//       return null;
//     }
//   }

//   private async getContextFromRequest(
//     req: Request,
//   ): Promise<ContextAndResourcesDTO | null> {
//     const token = req.headers['context-token']?.toString();
//     if (!token) {
//       return null;
//     }

//     try {
//       const keyPath =
//         this.configService.get<string>('KEY_PATH') ||
//         join(__dirname, '../../../chaves');
//       const filepath = join(keyPath, 'public_key.pem');

//       const publicKey = fs.readFileSync(filepath, 'utf8');

//       const token_verify = this.jwtService.verify<ContextAndResourcesDTO>(
//         token,
//         {
//           publicKey,
//           algorithms: ['ES512'],
//         },
//       );
//       const contextAndResources = {} as ContextAndResourcesDTO;
//       if (!token_verify.context) {
//         return null;
//       }
//       contextAndResources.context = token_verify.context;
//       contextAndResources.resources = token_verify.resources;
//       return contextAndResources;
//     } catch (err) {
//       Next;
//       return null;
//     }
//   }
// }
