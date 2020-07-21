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
import { Value, Variable } from '../validators/validator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('luckyseven')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('store-value')
  storeValue(@Body() body: Value) {
    return this.apiService.storeValue(body.value);
  }

  @Get('get-value')
  shortestPath(@Query() params: Variable) {
    return this.apiService.getValue(params.variable);
  }
}
