import { bergaSkolan } from "./school.js";
import { subjects } from "./subjects.js";
import { studentsAtBerga } from "./students.js";
import { teachersAtBerga } from "./teachers.js";
import { Grade } from "./grades.js";

export function displayAllStudents() {
  let studentNames = [];
  let studentSubjects = [];
  let nrOfStudents = 0;
  let studentHtml = "";
  let studentSubjectsMap = [];

  for (let studentKey in studentsAtBerga) {
    if (typeof studentsAtBerga[studentKey] === "object") {
      const student = studentsAtBerga[studentKey];
      studentSubjectsMap = student.subjects
        .map((subject) => subject.name)
        .join(", ");

      studentNames.push(student.name);
      studentSubjects.push(studentSubjectsMap);
      studentHtml += `<p>Student ${nrOfStudents + 1}: ${student.name} </p>`;
      studentHtml += `<p>Age: ${student.age}</p>`;
      studentHtml += `<p>Gender: ${student.gender}`;
      studentHtml += `<p>Subjects: ${studentSubjectsMap} </p>`;
      studentHtml += "-------------------------------------------------------";

      console.log(`Student: ${student.name}`);
      console.log(`Age: ${student.age}`);
      console.log(`Gender: ${student.gender}`);
      console.log(`Subjects: ${studentSubjectsMap}`);
      console.log("------------------------");

      nrOfStudents++;
    }
  }

  const studentsDiv = document.getElementById("studentNames");
  const nrOfStudentsDiv = document.getElementById("nrOfStudents");

  studentsDiv.innerHTML = studentHtml;
  nrOfStudentsDiv.innerHTML =
    "There are: " +
    nrOfStudents +
    " at Bergaskolan. <br> -------------------------------------------------------";

  return "The number of students enlisted are: " + nrOfStudents;
}

export function displayAllTeachers() {
  let teacherNames = [];
  let teacherSubjects = [];
  let nrOfTeachers = 0;
  let teacherHtml = "";
  let teacherSubjectsMap = [];

  for (let teacherKey in teachersAtBerga) {
    if (typeof teachersAtBerga[teacherKey] === "object") {
      const teacher = teachersAtBerga[teacherKey];
      teacherSubjectsMap = teacher.subjects
        .map((subject) => subject.name)
        .join(", ");

      teacherNames.push(teacher.name);
      teacherSubjects.push(teacherSubjectsMap);
      teacherHtml += `<p>Teacher ${nrOfTeachers + 1}: ${teacher.name} </p>`;
      teacherHtml += `<p>Teaches in subjects: ${teacherSubjectsMap} </p>`;
      teacherHtml += "-------------------------------------------------------";

      console.log(`Teacher: ${teacher.name}`);
      console.log(`Teaches in subjects: ${teacherSubjectsMap}`);
      console.log("------------------------");

      nrOfTeachers++;
    }
  }

  const teachersDiv = document.getElementById("teacherNames");
  const nrOfTeachersDiv = document.getElementById("nrOfTeachers");

  teachersDiv.innerHTML = teacherHtml;
  nrOfTeachersDiv.innerHTML =
    "There are: " +
    nrOfTeachers +
    " teachers teaching at Bergaskolan. <br> -------------------------------------------------------";

  return nrOfTeachers;
}

export function displayAllSubjectsOfStudent(student) {
  let totalGradesWorth = 0;
  let totalCoursePoints = 0;
  let subjectsInfo = [];

  student.subjects.forEach((subject) => {
    const gradeInfo = subject.grades[student.name];
    const coursePoints = subject.points;

    let subjectInfo = {
      name: subject.name,
      points: coursePoints,
      grade: gradeInfo ? gradeInfo.grade : "Not graded",
      teacher: subject.teachers.map((teacher) => teacher.name).join(", "),
    };

    if (gradeInfo) {
      subjectInfo.gradedBy = gradeInfo.teacherId;
      subjectInfo.gradedOn = new Date(gradeInfo.date).toLocaleDateString();
      subjectInfo.weightedPoints = Grade[gradeInfo.grade] * coursePoints;

      totalGradesWorth += subjectInfo.weightedPoints;
      totalCoursePoints += coursePoints;
    }

    subjectsInfo.push(subjectInfo);
    console.log(`Subject: ${subjectInfo.name}`);
    console.log(`Course Points: ${subjectInfo.points}`);
    console.log(`Grade: ${subjectInfo.grade}`);
    console.log(`Teacher: ${subjectInfo.teacher}`);
    if (gradeInfo) {
      console.log(`Graded by: ${subjectInfo.gradedBy}`);
      console.log(`Graded on: ${subjectInfo.gradedOn}`);
      console.log(`Weighted Points: ${subjectInfo.weightedPoints}`);
    }
    console.log("------------------------");
  });

  const weightedGPA =
    totalCoursePoints > 0
      ? (totalGradesWorth / totalCoursePoints).toFixed(2)
      : "No grades yet";

  console.log(`Total Course Points: ${totalCoursePoints}`);
  console.log(`Weighted GPA: ${weightedGPA}`);

  return {
    studentName: student.name,
    numberOfSubjects: student.subjects.length,
    subjects: subjectsInfo,
    totalCoursePoints,
    weightedGPA,
  };
}

export function displayAllStudentsEnlistedToSubject(subject) {
  if (!subject || !subject.name) {
    return "Invalid subject provided.";
  }

  console.log(`Subject: ${subject.name}`);
  console.log(`Course Points: ${subject.points}`);
  console.log(
    `Teachers: ${subject.teachers.map((teacher) => teacher.name).join(", ")}`
  );
  console.log("------------------------");
  console.log("Students:");

  let studentsInfo = [];
  let gradeDistribution = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    "Not graded": 0,
  };

  subject.students.forEach((student) => {
    const gradeInfo = subject.grades[student.name];
    const grade = gradeInfo ? gradeInfo.grade : "Not graded";
    gradeDistribution[grade]++;

    let studentInfo = {
      name: student.name,
      grade: grade,
    };

    if (gradeInfo) {
      studentInfo.gradedBy = gradeInfo.teacherId;
      studentInfo.gradedOn = new Date(gradeInfo.date).toLocaleDateString();
      studentInfo.previousGrade = gradeInfo.previousGrade;
    }

    studentsInfo.push(studentInfo);

    console.log(`Student: ${studentInfo.name}`);
    console.log(`Grade: ${studentInfo.grade}`);
    if (gradeInfo) {
      console.log(`Graded by: ${studentInfo.gradedBy}`);
      console.log(`Graded on: ${studentInfo.gradedOn}`);
      if (studentInfo.previousGrade) {
        console.log(`Previous grade: ${studentInfo.previousGrade}`);
      }
    }
    console.log("------------------------");
  });

  console.log("Grade Distribution:");
  Object.entries(gradeDistribution)
    .filter(([_, count]) => count > 0)
    .forEach(([grade, count]) => {
      console.log(`${grade}: ${count} students`);
    });

  return {
    subjectName: subject.name,
    points: subject.points,
    teachers: subject.teachers.map((teacher) => teacher.name),
    numberOfStudents: subject.students.length,
    students: studentsInfo,
    gradeDistribution,
  };
}

export function initialiseSchool() {
  for (let studentKey in studentsAtBerga) {
    if (typeof studentsAtBerga[studentKey] === "object") {
      let student = studentsAtBerga[studentKey];
      bergaSkolan.students.push(student.name);

      if (student.age % 2 === 0) {
        studentsAtBerga.addSubject(student, subjects.Engelska_5);
        studentsAtBerga.addSubject(student, subjects.Svenska_1);
      } else {
        studentsAtBerga.addSubject(student, subjects.Mattematik_1c);
      }
    }
  }

  for (let teacherKey in teachersAtBerga) {
    if (typeof teachersAtBerga[teacherKey] === "object") {
      bergaSkolan.teachers.push(teachersAtBerga[teacherKey].name);
    }
  }

  teachersAtBerga.enlistToSubject(teachersAtBerga.Nicklas, subjects.Engelska_5);
  teachersAtBerga.enlistToSubject(teachersAtBerga.Nicklas, subjects.Svenska_1);
  teachersAtBerga.enlistToSubject(
    teachersAtBerga.Daniel,
    subjects.Mattematik_1c
  );
}

export function populateStudentSelect() {
    const selectElement = document.getElementById("studentsToRelegate");
    if (!selectElement) return;
    selectElement.innerHTML = "";

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a student";
    selectElement.appendChild(defaultOption);

    // Add all students as options
    for (let studentKey in studentsAtBerga) {
        if (typeof studentsAtBerga[studentKey] === "object") {
            const student = studentsAtBerga[studentKey];
            const option = document.createElement("option");
            option.value = student.name;
            option.textContent = student.name;
            selectElement.appendChild(option);
        }
    }
}