import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class StatsService {
  async getAll(userEmail) {
    let data = await dbContext.Stats.findOne({ creatorEmail: userEmail })
    return data
  }

  async create(body){
    let data = await dbContext.Stats.create(body)
    return data
  }

  async updateStats(body) {
    let stats = await dbContext.Stats.findOne({
      creatorEmail: body.creatorEmail
    })
    for(let prop in body){
      if(prop != "creatorEmail"){
        if (stats[prop]) {
          if (stats[prop].length > 9) {
            stats[prop].shift()
          } else {
          stats[prop].push(parseInt(body[prop]))
          }
        }
      }
    }
    await stats.save();
    return stats
  }
}

export const statsService = new StatsService()