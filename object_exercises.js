import { bergaSkolan } from './modules/school.js';
import { teachersAtBerga } from './modules/teachers.js';
import { studentsAtBerga } from './modules/students.js';
import { subjects } from './modules/subjects.js';
import { 
    initialiseSchool, 
    displayAllStudents, 
    displayAllTeachers,
    populateStudentSelect 
} from './modules/display.js';

document.addEventListener('DOMContentLoaded', () => {
    const schoolNameDiv = document.getElementById("schoolName");
    const relegateStudentButton = document.getElementById("relegateStudentButton");
    const studentsToRelegate = document.getElementById("studentsToRelegate");

    initialiseSchool();
    displayAllStudents();
    displayAllTeachers();
    populateStudentSelect();

    // Example of grading a student
    teachersAtBerga.gradeStudent(
        teachersAtBerga.Daniel,
        studentsAtBerga.Johan,
        subjects.Mattematik_1c,
        "A"
    );
    console.log(subjects.getstudentGrade(subjects.Mattematik_1c, "Johan"));

    
    if (schoolNameDiv) {
        schoolNameDiv.innerHTML = bergaSkolan.name;
    }

    if (relegateStudentButton && studentsToRelegate) {
        relegateStudentButton.addEventListener('click', () => {
            const selectedStudent = studentsToRelegate.value;
            if (selectedStudent) {
                bergaSkolan.relegateStudent(selectedStudent);
                // Update displays after relegation
                displayAllStudents();
                populateStudentSelect();
                alert(`${selectedStudent} has been relegated from ${bergaSkolan.name}`);
            } else {
                alert("Please select a student to relegate");
            }
        });
    }
});