/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class PostInteceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(PostInteceptor.name);

    const fechaInicio = Date.now();

    return next.handle().pipe(
      tap(() => {
        const fechaFin = Date.now();
        console.log("tiempo de solicitud:", fechaFin - fechaInicio, "ms");
        // despues del controlador pero no modifica la respuesta
      }),
      map((data) => {
        // despues del controlador y modifica la respuesta
        const igv = data.finalPrice * 0.18;
        data.igv = igv;
        return data;
      }),
    );
  }
}
