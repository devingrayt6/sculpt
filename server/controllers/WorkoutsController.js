import express from 'express'
import BaseController from "../utils/BaseController";
// @ts-ignore
import auth0provider from "@bcwdev/auth0provider";
import { workoutsService } from '../services/WorkoutsService'
import { exercisesService } from "../services/ExercisesService";



//PUBLIC
export class WorkoutsController extends BaseController {
  constructor() {
    super("api/workouts")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .post('/:id/exercise', this.addExercise)
      .put('/:id', this.edit)
      .put('/:id/editExercise', this.editExercise)
      .delete('/:id', this.delete)
      .delete('/:id/exercise', this.deleteExercise)
  }


  async getAll(req, res, next) {
    try {
      //only gets workoutS by user who is logged in
      let data = await workoutsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      let data = await workoutsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getExercisesByWorkoutId(req, res, next) {
    try {
      let data = await exercisesService.getExercisesByWorkoutId(req.params.id)
      return res.send(data);
    } catch (error) {

    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await workoutsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await workoutsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async editExercise(req, res, next) {
    try {
      let data = await workoutsService.editExercise(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await workoutsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

  async addExercise(req, res, next) {
    try {
      let exercise = await workoutsService.addExercise(req.params.id, req.body)
      return res.send("workout updated")
    } catch (error) {
      next(error)
    }
  }

  async deleteExercise(req, res, next) {
    try {
      let exercise = await workoutsService.deleteExercise(req.params.id, req.body)
      return res.send("exercise deleted")
    } catch (error) {
      next(error)
    }
  }
}
