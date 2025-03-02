import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const PORT = +process.env.PRODUCTO_SERVICE_PORT!;
  const HOST = process.env.PRODUCTOS_MS_HOST!;
  console.log(`PORT: ${PORT}`);
  console.log(`HOST: ${HOST}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: HOST,
      },
    },
  );
  await app.listen();
  console.log(`Microservice productos is listening on port ${PORT}`);
}
bootstrap();
