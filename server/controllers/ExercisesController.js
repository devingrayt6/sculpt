import express from 'express'
import BaseController from "../utils/BaseController";
// @ts-ignore
import auth0provider from "@bcwdev/auth0provider";
import { exercisesService } from "../services/ExercisesService";



export class ExercisesController extends BaseController {

  constructor() {
    super("api/exercises")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      let data = await exercisesService.getAll(req.userInfo.email)
      return res.send(data)
    } catch (err) { next(err) }
  }



  async getById(req, res, next) {
    try {
      let data = await exercisesService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }



  async create(req, res, next) {
    try {
      let data = await exercisesService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }

  }



  async edit(req, res, next) {
    try {
      let data = await exercisesService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }



  async delete(req, res, next) {
    try {
      await exercisesService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}

