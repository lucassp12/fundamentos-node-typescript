import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  //const appointments = appointmentRepository.all();F

  //return response.json(appointments);

});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentsService(appointmentsRepository);
    const appointment = createAppointment.execute({ provider, date: parsedDate });


    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }

});



export default appointmentsRouter;
