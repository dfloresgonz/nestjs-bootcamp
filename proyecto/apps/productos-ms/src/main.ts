import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const PORT = +process.env.PORT!;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: "0.0.0.0",
      },
    },
  );
  await app.listen();
  console.log(`Microservice productos is listening on port ${PORT}`);
}
bootstrap();
