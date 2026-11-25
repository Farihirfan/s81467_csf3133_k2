// Validates input, determines grade, sets colour, and displays timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check empty mark (Part 2)
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check non-numeric mark
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Check out-of-range mark
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let resultEl = document.getElementById("result");

    // Determine grade and set result colour (Part 2)
    if (mark >= 80) {
        grade = "A";
        resultEl.style.color = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultEl.style.color = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultEl.style.color = "orange";
    } else {
        grade = "F";
        resultEl.style.color = "red";
    }

    // Display grade result and current date/time (Part 2)
    resultEl.innerHTML = name + " got grade " + grade;
    document.getElementById("checkedDate").innerHTML = "Checked on: " + new Date();

    return false; // Prevent form page refresh
}

// Generates a random whole number from 0 to 100 and puts it into the mark input (Part 2)
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Displays all four grade rows in a table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}

// =========================================================================
// LIST OF ERRORS IDENTIFIED AND FIXED (Part 1)
// =========================================================================
// Error 1 (grade.html, Line 9): onsubmit="checkMark()" lacked 'return', causing the form to submit and reload the page immediately. Changed to onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): onclick="showtable()" had wrong capitalization. Changed to onclick="showTable()".
// Error 3 (grade.html, Line 19): <script src="grades.js"> pointed to wrong filename. Changed to src="grade.js".
// Error 4 (grade.js, Line 2-3): Missing '=' assignment operators in 'let name' and 'let mark', plus mismatched bracket '["mark")'. Fixed to '["mark"]'.
// Error 5 (grade.js, Line 4): Used single '=' assignment (name = "") instead of comparison (name === "").
// Error 6 (grade.js, Line 8): Misspelled 'isNan(mark)'. Changed to 'isNaN(mark)'.
// Error 7 (grade.js, Line 12): Used '&&' instead of '||' in (mark < 0 && mark > 100), which can never be true. Changed to (mark < 0 || mark > 100).
// Error 8 (grade.js, Line 16): Missing '=' in 'mark parseInt(mark);'. Fixed to 'mark = parseInt(mark);'.
// Error 9 (grade.js, Line 23-26): Missing closing ')' on line 23, lowercase '"c"' instead of '"C"', and missing '=' in 'grade "F";'.
// Error 10 (grade.js, Line 28-30): Misspelled 'getElementByID' (should be 'getElementById'), missing quotes around ' got grade ', and British spelling 'style.colour' (should be 'style.color').
// Error 11 (grade.js, Line 37-42): Loop started at 'i = 1' instead of 'i = 0' (missing grade A), '</table>' was inside the loop, and 'innerHtml' was misspelled (should be 'innerHTML').
// =========================================================================