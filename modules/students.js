import { subjects } from "./subjects.js";

export const studentsAtBerga = {
  Johan: {
    name: "Johan",
    age: 23,
    gender: "Man",
    subjects: [],
  },
  Ruben: {
    name: "Ruben",
    age: 26,
    gender: "Man",
    subjects: [],
  },
  Måns: {
    name: "Måns",
    age: 24,
    gender: "Man",
    subjects: [],
  },
  Sebbe: {
    name: "Sebbe",
    age: 19,
    gender: "Man",
    subjects: [],
  },
  Piano: {
    name: "Piano",
    age: 25,
    gender: "Kvinna",
    subjects: [],
  },

  addSubject(student, subject) {
    student.subjects.push(subject);
    subject.students.push(student);
  },

  getGrades(student) {
    let allGrades = {};

    student.subjects.forEach((subject) => {
      const gradeInfo = subjects.getstudentGrade(subject, student.name);
      if (gradeInfo) {
        allGrades[subject.name] = {
          ...gradeInfo,
          points: subject.points,
        };
      }
    });

    return allGrades;
  },
};
