// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   Inject,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { I18nService } from 'nestjs-i18n';
// import { RolesService } from 'src/modules/roles/roles.service';
// import { RolesGuardRequest } from 'src/shared/interfaces/rolesGuardRequest.interface';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     @Inject(RolesService)
//     private readonly rolesService: RolesService,
//     @Inject(I18nService)
//     private readonly i18n: I18nService,
//     private reflector: Reflector,
//   ) {}

//   async canActivate(executionContext: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<string[]>(
//       'roles',
//       executionContext.getHandler(),
//     );
//     const scopes = this.reflector.get<string[]>(
//       'scope',
//       executionContext.getHandler(),
//     );
//     const request = executionContext
//       .switchToHttp()
//       .getRequest<RolesGuardRequest>();

//     if (!roles) {
//       return true;
//     }

//     if (roles.includes('OPEN')) {
//       return true;
//     }

//     const lang = request.headers.language ?? 'pt-br';

//     if (!request.context || !request.resources) {
//       throw new ForbiddenException(
//         this.i18n.translate('events.permission.notEnoughContext', { lang }),
//       );
//     }
//     const {
//       instanceId: contextInstanceId,
//       establishmentId: contextEstablishmentId,
//     } = request.context;

//     const {
//       establishmentId: paramsEstablishmentId,
//       instanceId: paramsInstanceId,
//     } = request.params;

//     const testContext = this.compareContextToParams(
//       scopes,
//       { establishmentId: paramsEstablishmentId, instanceId: paramsInstanceId },
//       {
//         establishmentId: contextEstablishmentId,
//         instanceId: contextInstanceId,
//       },
//     );
//     if (!testContext) {
//       throw new ForbiddenException(
//         this.i18n.translate('events.permission.notEnoughContext', { lang }),
//       );
//     }
//     const resources: string[] = request.resources;
//     const hasRole: boolean = roles.every((role) => resources.includes(role));

//     if (!hasRole) {
//       throw new ForbiddenException(
//         this.i18n.translate('events.permission.notEnoughPrivileges', { lang }),
//       );
//     }

//     return true;
//   }

//   private compareContextToParams(
//     scopes: string[],
//     params: {
//       instanceId: string | null;
//       establishmentId: string | null;
//     },
//     context: {
//       instanceId: string | null;
//       establishmentId: string | null;
//     },
//   ): boolean {
//     return scopes.some((scope) => {
//       switch (scope) {
//         case 'global':
//           return true;

//         case 'instance':
//           return context.instanceId !== null;

//         case 'establishment':
//           return context.establishmentId !== null;
//       }
//       return false;
//     });
//   }
// }
