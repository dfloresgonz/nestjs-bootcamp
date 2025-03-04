import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { Product } from "apps/utils/types";

@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Product {
    console.log(TransformPipe.name, value.description);

    const transformedBody = value as Product;
    const newDescription = transformedBody.description
      .split(" ")
      .filter((s) => s)
      .join(" ");
    transformedBody.description = newDescription;
    return transformedBody;
  }
}
