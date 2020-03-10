import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { dbContext } from "../db/DbContext";
import {scheduleService} from "../services/ScheduleService"

export class ProfilesController extends BaseController {

  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .get("/:id/schedule/:scheduleId", this.getScheduleByUserId)
      .put("/:id", this.edit)
      .put("/:id/schedule/:scheduleId", this.editScheduleByUserId)
  }

  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async getScheduleByUserId(req, res, next) {
    try {
      let schedule = await scheduleService.getScheduleByUserId(req.params.id)
    } catch (error) {
      next(error)
    }
  }
  async editScheduleByUserId(req, res, next) {
    try {
      let schedule = await scheduleService.editScheduleByUserId(req.params.id)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
