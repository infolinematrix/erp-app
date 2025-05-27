// //--This setup for expressjs
// import express from "express";
// import { auth } from "./auth.js";
// import { api } from "./api.js";

// const app = express();

// app.set("trust proxy", true);
// app.use("/auth/*", auth);
// app.use(api);

// // This code is responsible for serving the frontend files.
// const frontendFiles = process.cwd() + "/dist/erp-app/browser";
// app.use(express.static(frontendFiles));
// app.get("/*", (_, res) => {
//   res.sendFile(frontendFiles + "/index.html");
// });
// // end of frontend serving code

// app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));

import 'reflect-metadata'; // Important for NestJS
import * as dotenv from 'dotenv';
dotenv.config();

import { join } from 'path';
import { Request, Response } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { api } from './api.js';
// import session from 'express-session';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { GlobalExceptionHandler } from './utils/exception-handler.js';
import { GlobalResponseInterceptor } from './utils/global-response.interceptor.js';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, x-api-key, x-center, x-user',
  });

  const config = new DocumentBuilder()
    .setTitle('BACKEND API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'ApiKeyAuth'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('server/docs', app, document);

  app.use(api); // Init remultApi

  

  /**
   * Global
   */
  // app.useGlobalFilters(new GlobalExceptionHandler());
  // app.useGlobalInterceptors(new GlobalResponseInterceptor());

  const port = process.env['PORT'] || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`,
    'Bootstrap'
  );
}
bootstrap();
