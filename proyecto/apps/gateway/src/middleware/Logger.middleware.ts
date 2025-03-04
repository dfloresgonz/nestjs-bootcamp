import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(LoggerMiddleware.name);
    console.log(`Solicitud a la ruta: ${req.method} ${req.originalUrl}`);
    console.log("Fecha y hora: ", new Date().toLocaleString());
    console.log("Dirección IP: ", req.ip);
    const random = Math.random();
    req["random_codigo"] = random;
    next();
  }
}
