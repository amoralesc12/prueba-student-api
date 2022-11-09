const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Root2497!",
    database: "studentsdb",
  },
});
//TODO: get
async function getStudents() {
  const students = JSON.parse(JSON.stringify(await knex("students")));
  const studentsReturn = students.slice();
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    //const classes = await getEnrolledClasses(student.id);
    // studentsReturn[i].classes = classes;
  }
  return studentsReturn;
}

async function getEnrolledClasses(studentId) {
  const classes = [];
  const studentClasses = JSON.parse(
    JSON.stringify(
      await knex
        .select()
        .table("students_classes")
        .where("student_id", studentId)
    )
  );
  for (let i = 0; i < studentClasses.length; i++) {
    const enrolledClass = JSON.parse(
      JSON.stringify(
        await knex
          .select()
          .table("classes")
          .where("id", studentClasses[i].class_id)
      )
    );
    if (enrolledClass.length) classes.push(enrolledClass[0].name);
  }
  return classes;
}

//TODO: create student
async function createStudent(name_S, age_S, campus_id_S, No_cuenta_S) {
  return knex("students").insert({
    name: name_S,
    age: age_S ? age_S : null,
    campus_id: campus_id_S,
    No_cuenta: No_cuenta_S,
  });
}

async function getStudentById(id) {
  const student = JSON.parse(
    JSON.stringify(await knex.select().table("students").where("id", id))
  );
  return student;
}

async function deleteStudentById(id) {
  return await knex("students").where("id", id).del();
}

async function updateStudent(id, student) {
  await knex("students").where("id", "=", id).update({
    name: student.name,
    age: student.age,
  });
  return;
}
async function getLastID() {
  return await knex
    .select("id")
    .from("students")
    .orderBy("id", "desc")
    .limit(1);
}

module.exports = {
  getStudents,
  getStudentById,
  deleteStudentById,
  createStudent,
  updateStudent,
  getLastID,
};
