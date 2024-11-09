import { subjects } from "./subjects.js";
import { studentsAtBerga } from "./students.js";
import { teachersAtBerga } from "./teachers.js";

export const bergaSkolan = {
  name: "Bergaskolan",
  adress: "Bergagatan 33",
  zipCode: 24424,
  city: "Lund",
  students: [],
  teachers: [],

  addStudent(name, age, gender, subjects) {
    let newStudent = {
      name: name,
      age: age,
      gender: gender,
      subjects: subjects || [],
    };

    this.students.push(name);
    subjects.forEach((subject) => {
      subject.students.push(newStudent);
    });
    studentsAtBerga[name] = newStudent;
  },

  addTeacher(name, subjects) {
    let newTeacher = {
      name: name,
      subjects: subjects || [],
    };

    this.teachers.push(name);
    subjects.forEach((subject) => {
      subject.teachers.push(newTeacher);
    });
    teachersAtBerga[name] = newTeacher;
  },

  relegateStudent(name) {
    for (let subjectKey in subjects) {
      if (typeof subjects[subjectKey] === "object") {
        const subject = subjects[subjectKey];
        subjects.removePersonFromSubject(false, name, subject);
      }
    }
    for (let studentKey in studentsAtBerga) {
      if (studentsAtBerga[studentKey].name === name) {
        delete studentsAtBerga[studentKey];
        this.students.splice(studentKey, 1);
        return name + " was relegated.";
      }
    }
  },

  fireTeacher(name) {
    for (let subjectKey in subjects) {
      if (typeof subjects[subjectKey] === "object") {
        const subject = subjects[subjectKey];
        subjects.removePersonFromSubject(true, name, subject);
      }
    }
    for (let teacherKey in teachersAtBerga) {
      if (teachersAtBerga[teacherKey].name === name) {
        delete teachersAtBerga[teacherKey];
        this.teachers.splice(teacherKey, 1);
        return name + " was fired.";
      }
    }
  },
};
