// import {
//   SetMetadata,
//   UseGuards,
//   applyDecorators,
// } from "@nestjs/common";
// import { ApiBearerAuth } from "@nestjs/swagger";
// import { FeatureEnum } from "src/shared/enums/Feature.enum";

// export function Auth(feature: FeatureEnum[]) {
//   return applyDecorators(
//     SetMetadata("feature", feature),
//     //UseGuards(AuthGuard("jwt"), RolesGuard),
//     ApiBearerAuth(),
//   );
// }
