import { Grade } from "./grades.js";

export const subjects = {
  Mattematik_1c: {
    name: "Mattematik_1c",
    students: [],
    teachers: [],
    grades: {},
    points: 100,
  },
  Engelska_5: {
    name: "Engelska_5",
    students: [],
    teachers: [],
    grades: {},
    points: 100,
  },
  Svenska_1: {
    name: "Svenska_1",
    students: [],
    teachers: [],
    grades: {},
    points: 100,
  },

  addSubject(name, students, teachers, coursePoints) {
    let newSubject = {
      name: name,
      students: students || [],
      teachers: teachers || [],
      grades: {},
      points: coursePoints,
    };

    subjects[name] = newSubject;
    students.forEach((student) => {
      student.subjects.push(newSubject);
    });
    teachers.forEach((teacher) => {
      teacher.subjects.push(newSubject);
    });
  },

  removePersonFromSubject(isTeacher = true, name, subject) {
    if (isTeacher) {
      for (let i = 0; i < subject.teachers.length; i++) {
        if (subject.teachers[i].name === name) {
          subject.teachers.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < subject.students.length; i++) {
        if (subject.students[i].name === name) {
          subject.students.splice(i, 1);
        }
      }
    }
  },

  isValidGrade(grade) {
    return Grade.hasOwnProperty(grade);
  },

  getstudentGrade(subject, studentName) {
    if (typeof subject === "object" && subject !== null) {
      return subject.grades[studentName] || null;
    } else if (this[subject] && this[subject].grades[studentName]) {
      return this[subject].grades[studentName];
    }
    return null;
  },
};
