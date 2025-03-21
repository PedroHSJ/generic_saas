import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { AllExceptionsFilter } from "./shared/helpers/filters/ExceptionFilter";
import { initializeTransactionalContext } from "typeorm-transactional";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DatabaseService } from "./shared/modules/database/database.service";
import {
  I18nContext,
  I18nService,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
  logger,
} from "nestjs-i18n";
import { keyGenerate } from "./shared/helpers/keyGenerate";
import { apiReference } from "@scalar/nestjs-api-reference";

async function bootstrap() {
  keyGenerate();
  dotenv.config();
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const databaseService = app.get(DatabaseService);

  await databaseService.createSchema();
  await databaseService.createTables();
  await databaseService.loadData();
  const i18n =
    app.get<I18nService<Record<string, unknown>>>(I18nService);
  app.setGlobalPrefix("api");
  app.useGlobalFilters(
    new AllExceptionsFilter(i18n),
    new I18nValidationExceptionFilter({
      errorFormatter(errors) {
        return errors.map((error) => {
          return {
            field: error.property,
            message: Object.values(error.constraints).find(
              (i) => true,
            ),
          };
        });
      },
      responseBodyFormatter(host, exc, formattedErrors) {
        const i18nContext = I18nContext.current();
        const translatedMessage = i18nContext
          ? i18nContext.translate("events.validation.validationError")
          : "Validation error";
        return {
          statusCode: exc.getStatus(),
          message: translatedMessage,
          errors: formattedErrors,
        };
      },
    }),
  );
  app.useGlobalPipes(new I18nValidationPipe());

  if (process.env.NODE_ENV === "development") app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("NutriFlow API")
    .setDescription(
      "NutriFlow API is a platform for nutritionists and patients",
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    // .addApiKey(
    //   { type: "apiKey", name: "context-token", in: "header" },
    //   "context-token",
    // )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api", app, document, {
  //   swaggerOptions: {
  //     persistAuthorization: true,
  //   },
  //   customCss: ".swagger-ui .topbar { display: none }",
  // });

  app.use(
    "/api/docs",
    apiReference({
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
