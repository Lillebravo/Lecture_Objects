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
  relegateStudent: function (name) {},
  fireTeacher: function (name) {
    for (let teacherKey in teachersAtBerga) {
      if (teachersAtBerga[teacherKey].name === name) {
        delete teachersAtBerga[teacherKey];
        this.teachers.splice(teacherKey, 1);
        return name + " was fired.";
      }
    }
  },
};

// lägg till quitSubject, removeTeacher, relegateStudent, fireTeacher

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
  quitSubject: function (student, subject) {},
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
};

let subjects = {
  mattematik: {
    name: "Mattematik",
    students: [],
    teachers: [],
  },
  engelska: {
    name: "Engelska",
    students: [],
    teachers: [],
  },
  svenska: {
    name: "Svenska",
    students: [],
    teachers: [],
  },
  addSubject: function (name, students, teachers) {
    let newSubject = {
      name: name,
      students: students || [],
      teachers: teachers || [],
    };

    subjects[name] = newSubject;
    students.forEach((student) => {
      student.subjects.push(newSubject);
    });
    teachers.forEach((teacher) => {
      teacher.subjects.push(newSubject);
    });
  },
  removeTeacher: function (teacher, subject) {
    for (let subjectKey in subjects) {
      if (subject.teachers[subjectKey] === teacher.name) {
        this.teachers.splice(subjectKey, 1); // doesn´t work atm
      }
    }
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
        studentsAtBerga.addSubject(student, subjects.engelska);
        studentsAtBerga.addSubject(student, subjects.svenska);
      } else {
        studentsAtBerga.addSubject(student, subjects.mattematik);
      }
    }
  }
  for (let teacherKey in teachersAtBerga) {
    if (typeof teachersAtBerga[teacherKey] === "object") {
      bergaSkolan.teachers.push(teachersAtBerga[teacherKey].name);
    }
  }
  teachersAtBerga.enlistToSubject(teachersAtBerga.Nicklas, subjects.engelska);
  teachersAtBerga.enlistToSubject(teachersAtBerga.Nicklas, subjects.svenska);
  teachersAtBerga.enlistToSubject(teachersAtBerga.Daniel, subjects.mattematik);
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
  console.log(
    `Subjects: ${student.subjects.map((subject) => subject.name).join(", ")}`
  );
  const nrOfSubjects = student.subjects.length;
  if (nrOfSubjects > 1) {
    return student.name + " studies: " + nrOfSubjects + " subjects.";
  } else if (nrOfSubjects == 1) {
    return student.name + " studies: 1 subject";
  } else {
    return student.name + " doesn´t have any subjects at the moment.";
  }
}

function displayAllStudentsEnlistedToSubject(subject) {
  let nrOfStudents = 0;

  if (subject && subject.name) {
    subject.students.forEach((student) => {
      console.log(`Student: ${student.name}`);
      console.log("------------------------");
      nrOfStudents++;
    });
    return `Number of students studying ${subject.name}: ${nrOfStudents}`;
  } else {
    return "Invalid subject provided.";
  }
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

// Bygg ut med ett ytterligare typ av objekt, lägg till objekt som handlar om betyg. Vilka egenskaper ska dessa ha?
// Vilka metoder kan behövas i dessa betygsobjekt? Hur ska relationen mellan de andra objekten vara? Vilka metoder bör
// finnas i de andra typerna av objekt som behandlar betyg? Försöka lösa detta och inspektera och lek runt med det i konsolen.

initialiseSchool();
displayAllStudents();
displayAllTeachers();
