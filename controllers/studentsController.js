const studentsService = require("../services/students");

async function getS(_, res) {
  const students = await studentsService.getStudents();
  res.send(students);
}

async function getById(req, res) {
  //validations
  const { id } = req.params;
  const user = await studentsService.getStudentById(id);
  if (user.length) res.send(user[0]);
}

async function deleteById(req, res) {
  //validations
  const { id } = req.params;
  await studentsService.deleteStudentById(id);
  res.send({});
}

async function update(req, res) {
  //parametros
  const { id } = req.params;
  const student = req.body;

  //validar parametros

  //llamado a bd actualizar
  await studentsService.updateStudent(id, student);
  res.status(204).send();
}

function create(req, res) {
  const alumno = req.body;
  studentsService.createStudent(alumno);
  res.send({});
}

module.exports = {
  getS,
  getById,
  deleteById,
  create,
  update,
};
