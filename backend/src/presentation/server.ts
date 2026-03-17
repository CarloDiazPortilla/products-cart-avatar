import express, { Router } from "express"
import type { Request, Response } from "express";
import { ApiResponse } from "../domain/entities/api-response.entity";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // middlewares
    this.app.use(express.json());

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