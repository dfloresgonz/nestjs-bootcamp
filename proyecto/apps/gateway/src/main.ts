import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { MiGuardGuard } from "./mi-guard/mi-guard.guard";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") ?? 3000;

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // quitar propiedades que no estén en el DTO
  //     forbidNonWhitelisted: true, // lanzar error si hay propiedades no permitidas
  //     transform: true, // transformar los datos de entrada a su tipo correcto
  //   }),
  // );

  // app.useGlobalGuards(new MiGuardGuard());

  await app.listen(port);
  console.log(`Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
