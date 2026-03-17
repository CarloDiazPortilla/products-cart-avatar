import express, { Router } from "express"
import type { Request, Response } from "express";
import { ApiResponse } from "../domain/entities/api-response.entity";
import cookieParser from "cookie-parser";
import cors from "cors";

interface ServerOptions {
  port: number;
  routes: Router;
  frontend_url: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;
  private readonly frontend_url: string;

  constructor(options: ServerOptions) {
    const { port, routes, frontend_url } = options;
    this.port = port;
    this.routes = routes;
    this.frontend_url = frontend_url;
  }

  async start() {

    this.app.use(
      cors({
        origin: this.frontend_url,
        credentials: true,
      })
    );

    // middlewares
    this.app.use(express.json());
    this.app.use(cookieParser());

    // routes
    this.app.use(this.routes);

    // route not found
    this.app.use((request: Request, response: Response) => {
      response.status(404).json(ApiResponse.buildResponse(404, "Route not found", null));
    })

    // listen on port
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })

  }

  public close() {
    this.serverListener?.close();
  }
}