let bergaSkolan = {
  name: "Bergaskolan",
  adress: "Bergagatan 33",
  zipCode: 24424,
  city: "Lund",
  students: [],
  teachers: [],

  addStudent: function (name, age, gender, subjects) {
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

  addTeacher: function (name, subjects) {
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

  relegateStudent: function (name) {
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

  fireTeacher: function (name) {
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

let studentsAtBerga = {
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

  addSubject: function (student, subject) {
    student.subjects.push(subject);
    subject.students.push(student);
  },

  getGrades: function (student) {
    let allGrades = {};

    student.subjects.forEach(subject => {
      const gradeInfo = subjects.getstudentGrade(subject, student.name);
      if (gradeInfo) {
        allGrades[subject.name] = {
          ...gradeInfo,
          points: subject.points
        };
      }
    });
    
    return allGrades;
  }
};

let teachersAtBerga = {
  Nicklas: {
    name: "Nicklas",
    subjects: [],
  },
  Daniel: {
    name: "Daniel",
    subjects: [],
  },

  enlistToSubject: function (teacher, subject) {
    teacher.subjects.push(subject);
    subject.teachers.push(teacher);
  },

  gradeStudent: function (teacher, student, subject, grade) {
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
      teacherId: teacher.name  
    };

    if (existingGrade) {
      gradeData.previousGrade = existingGrade.grade;
      subject.grades[student.name] = gradeData;
      return `Grade was updated from ${existingGrade.grade} to ${grade} for ${student.name} in ${subject.name}`;
    }

    subject.grades[student.name] = gradeData;
    return `Grade ${grade} assigned to ${student.name} in ${subject.name}`;
  }
};

/* in the studentsOfBerga, cant we just use subjects.getStudentGrade in our getGrades method? Should make it easier to maintain  */

let Grade = {
  A: 20, 
  B: 17.5, 
  C: 15,
  D: 12.5,
  E: 10,
  F: 0
};

let subjects = {
  Mattematik_1c: {
    name: "Mattematik_1c",
    students: [],
    teachers: [],
    grades: {},
    points: 100
  },
  Engelska_5: {
    name: "Engelska_5",
    students: [],
    teachers: [],
    grades: {},
    points: 100
  },
  Svenska_1: {
    name: "Svenska_1",
    students: [],
    teachers: [],
    grades: {},
    points: 100
  },

  addSubject: function (name, students, teachers, coursePoints) {
    let newSubject = {
      name: name,
      students: students || [],
      teachers: teachers || [],
      grades: {},
      points: coursePoints
    };

    subjects[name] = newSubject;
    students.forEach((student) => {
      student.subjects.push(newSubject);
    });
    teachers.forEach((teacher) => {
      teacher.subjects.push(newSubject);
    });
  },

  removePersonFromSubject: function (isTeacher = true, name, subject) {
    // was thinking of just iterating both teachers/students and remove anyone with matching name
    //in that case there would be no need for a boolean but then there would be problems if a student and teacher have the same name
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

  isValidGrade: function (grade) {
    return Grade.hasOwnProperty(grade);
  },

  getstudentGrade: function (subject, studentName) {
    if (typeof subject === 'object' && subject !== null) {
      return subject.grades[studentName] || null;
    } else if (this[subject] && this[subject].grades[studentName]) {
      return this[subject].grades[studentName];
    }
    return null;
  }
};

// 5. Skriv en kodrad där du lägger till ett ämne i en lärares ämnesArray.
// Hur kan man använda den datan ur ett admins perspektiv på en skola, och tycker du den är komplett? Vad saknas?
// Svar: Tyckte det saknades att kunna lägga till läraren i ämnesArrayen och att kunna göra det samma för studenter så lade till det.
/* function addSubject(teachersOrStudents, subject, isTeacher = true, addItLast = true) {
  if (isTeacher) {
    if (addItLast) {
        teachersOrStudents["subjects"].push(subject);
      } else {
        teachersOrStudents["subjects"].unshift(subject);
      }
    subject["teachers"].push(teachersOrStudents["name"]);
  } else {
    if (addItLast) {
        teachersOrStudents["subjects"].push(subject);
      } else {
        teachersOrStudents["subjects"].unshift(subject);
      }
    subject["students"].push(teachersOrStudents["name"]);
  }
} */
/*addSubject(teachersAtBerga["teacher1"], mattematik, true, true);
console.log(teachers.teacher1);
console.log(mattematik); */

function initialiseSchool() {
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
  teachersAtBerga.enlistToSubject(teachersAtBerga.Daniel, subjects.Mattematik_1c);
}

function displayAllStudents() {
  let nrOfStudents = 0;
  for (let studentKey in studentsAtBerga) {
    if (typeof studentsAtBerga[studentKey] === "object") {
      const student = studentsAtBerga[studentKey];
      console.log(`Student: ${student.name}`);
      console.log(`Age: ${student.age}`);
      console.log(`Gender: ${student.gender}`);
      console.log(
        `Subjects: ${student.subjects
          .map((subject) => subject.name)
          .join(", ")}`
      );
      console.log("------------------------");
      nrOfStudents++;
    }
  }
  return "The number of students enlisted are: " + nrOfStudents;
}

function displayAllSubjectsOfStudent(student) {
  let totalGradesWorth = 0;
  let totalCoursePoints = 0;
  let subjectsInfo = [];

  student.subjects.forEach(subject => {
    const gradeInfo = subject.grades[student.name];
    const coursePoints = subject.points;
    
    let subjectInfo = {
      name: subject.name,
      points: coursePoints,
      grade: gradeInfo ? gradeInfo.grade : 'Not graded',
      teacher: subject.teachers.map(teacher => teacher.name).join(', ')
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

  const weightedGPA = totalCoursePoints > 0 ? 
    (totalGradesWorth / totalCoursePoints).toFixed(2) : 
    'No grades yet';

  console.log(`Total Course Points: ${totalCoursePoints}`);
  console.log(`Weighted GPA: ${weightedGPA}`);

  return {
    studentName: student.name,
    numberOfSubjects: student.subjects.length,
    subjects: subjectsInfo,
    totalCoursePoints,
    weightedGPA
  };
}

function displayAllStudentsEnlistedToSubject(subject) {
  if (!subject || !subject.name) {
    return "Invalid subject provided.";
  }

  console.log(`Subject: ${subject.name}`);
  console.log(`Course Points: ${subject.points}`);
  console.log(`Teachers: ${subject.teachers.map(teacher => teacher.name).join(', ')}`);
  console.log("------------------------");
  console.log("Students:");

  let studentsInfo = [];
  let gradeDistribution = {
    A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, 'Not graded': 0
  };

  subject.students.forEach(student => {
    const gradeInfo = subject.grades[student.name];
    const grade = gradeInfo ? gradeInfo.grade : 'Not graded';
    gradeDistribution[grade]++;

    let studentInfo = {
      name: student.name,
      grade: grade
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
    teachers: subject.teachers.map(teacher => teacher.name),
    numberOfStudents: subject.students.length,
    students: studentsInfo,
    gradeDistribution
  };
}

function displayAllTeachers() {
  let nrOfTeachers = 0;
  for (let teacherKey in teachersAtBerga) {
    if (typeof teachersAtBerga[teacherKey] === "object") {
      const teacher = teachersAtBerga[teacherKey];
      console.log(`Teacher: ${teacher.name}`);
      console.log(
        `Teaches in subjects: ${teacher.subjects
          .map((subject) => subject.name)
          .join(", ")}`
      );
      console.log("------------------------");
      nrOfTeachers++;
    }
  }
  return nrOfTeachers;
}

initialiseSchool();
displayAllStudents();
displayAllTeachers();

teachersAtBerga.gradeStudent(teachersAtBerga.Daniel, studentsAtBerga.Johan, subjects.Mattematik_1c, 'A');
console.log(subjects.getstudentGrade(subjects.Mattematik_1c, "Johan"));