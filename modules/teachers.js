import { subjects } from "./subjects.js";

export const teachersAtBerga = {
  Nicklas: {
    name: "Nicklas",
    subjects: [],
  },
  Daniel: {
    name: "Daniel",
    subjects: [],
  },

  enlistToSubject(teacher, subject) {
    teacher.subjects.push(subject);
    subject.teachers.push(teacher);
  },

  gradeStudent(teacher, student, subject, grade) {
    if (!teacher.subjects.includes(subject)) {
      return `${teacher.name} is not authorized to grade ${subject.name}`;
    }
    if (!student.subjects.includes(subject)) {
      return `${student.name} is not enrolled in ${subject.name}`;
    }
    if (!subjects.isValidGrade(grade)) {
      return `Invalid grade: ${grade}`;
    }

    const existingGrade = subject.grades[student.name];
    const gradeData = {
      grade: grade,
      date: new Date().toISOString(),
      teacherId: teacher.name,
    };

    if (existingGrade) {
      gradeData.previousGrade = existingGrade.grade;
      subject.grades[student.name] = gradeData;
      return `Grade was updated from ${existingGrade.grade} to ${grade} for ${student.name} in ${subject.name}`;
    }

    subject.grades[student.name] = gradeData;
    return `Grade ${grade} assigned to ${student.name} in ${subject.name}`;
  },
};
