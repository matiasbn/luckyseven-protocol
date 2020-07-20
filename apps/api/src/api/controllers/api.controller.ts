import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiService } from '../services/api.service';
import { Value, ShortestPath, AllPaths } from '../validators/validator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('luckyseven')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('store-value')
  generateData(@Body() body: Value) {
    return this.apiService.storeValue(body.value);
  }

  // @Get('shortest-path')
  // shortestPath(@Query() params: ShortestPath) {
  //   return this.apiService.dijkstra(params.origin, params.destination);
  // }
}
