import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { statsService } from "../services/StatsService";

export class StatsController extends BaseController {

  constructor() {
    super("api/stats");
    this.router = express.Router()
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getStats)
      .post("", this.create)
      .put("/:id", this.updateStats)
  }

  async getStats(req, res, next) {
    try {
      let stats = await statsService.getAll(req.userInfo.email);
      return res.send(stats);
    } catch (error) {
      next(error);
    }
  }

  async updateStats(req,res,next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let stats = await statsService.updateStats(req.body)
      return res.send(stats)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next){
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await statsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }
}