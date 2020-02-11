import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'
import User from "../models/User";
import Appointments from "../models/Appointments";

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where:{id: req.userId, providers: true}
    })

    if(!checkUserProvider) {
      return res.status(400).json({error: 'User is not provider'})
    }

    const { date } = req.query
    const parseDate = parseISO(date)

    const appointments = await Appointments.findAll({
      where:{
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
        },
      },
      order: ['date']
    })

    return res.json(appointments)
  }
}

export default new ScheduleController();