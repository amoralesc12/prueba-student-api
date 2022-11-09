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
//TAREA
function get_YEAR() {
  const fecha = new Date();
  const anio = fecha.getFullYear().toString();
  let digitos = anio[2] + anio[3];
  return digitos;
}

function CREATENUMBER(CAMPUSYEAR, PADDING) {
  return CAMPUSYEAR + PADDING;
}
//FUNCION DE TAREA
async function createStudent(req, res) {
  const { name, age, campus_id } = req.body;
  const idC = campus_id;

  let No_cuenta1 = idC + get_YEAR();
  const ultimo = await ultimoID();
  let toSTRINGID = ultimo[0].id + 1;
  let lastnumber = padDigits(toSTRINGID, 5);

  const ACCOUNT = CREATENUMBER(No_cuenta1, lastnumber);
  const intNumerocuenta = parseInt(ACCOUNT);
  console.log(intNumerocuenta);

  const created = await create(name, age, campus_id, intNumerocuenta);

  if (created) {
    res.send({ intNumerocuenta: created[0] });
  } else {
    res.send("Unable to create");
  }
}

function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

module.exports = {
  getS,
  getById,
  deleteById,
  create,
  update,
};
