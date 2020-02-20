var selectedStudentIDs = [];
var numSelectedStudents = 0;
var selectedActivityID = undefined;

var footer;
var selectButton;
var submitButton;
var select;
var toSubmit = false; // if a selection was made
var activitiesHidden = true;
var studentsHidden = true;

$(document).ready(function(){
    footer = document.getElementById("footer");
    select = document.getElementById("select");
    selectButton = document.getElementById("selectButton");
    submitButton = document.getElementById("submitButton");
})

// a student was selected from the Students list
function selectedStudent(studentElement, studentID){
    // the passed student is being de-selected
    if(studentElement.classList.contains("selectedStudent")){
        studentElement.classList.remove("selectedStudent");
        removeStudentFromList(studentID);
        if(numSelectedStudents == 0){
            hideElement(selectButton);
            hideElement(submitButton);
        }
    }
    // the passed student is being selected
    else {
        studentElement.classList += " selectedStudent";
        addStudentToList(studentID);
        // first selected student -> show "Select Activity" button
        if(numSelectedStudents == 1){
            showButton("Activity");
        }
    }
}

function removeStudentFromList(studentID){
    numSelectedStudents--;
    var indexOf = selectedStudentIDs.indexOf(studentID);
    selectedStudentIDs.splice(indexOf, 1);
}

function addStudentToList(studentID){
    numSelectedStudents++;
    selectedStudentIDs.push(studentID);
}

function showButton(buttonText){
    if(toSubmit){
        showElement(submitButton, "inline-block");
    }
    else{
        showElement(select, "inline-block");
        showElement(selectButton, "inline-block");
        selectButton.text = "Select " + buttonText;
    }
}

/* Activity <li> element clicked, either make it green or de-select it */
function selectedActivity(element, activityId){
    // activity is already selected, deselect it
    if(element.classList.contains("selectedStudent")){
        element.classList.remove("selectedStudent");
        selectedActivityID = undefined;
        hideElement(submitButton);
        hideElement(selectButton);
    }
    // activity is not selected
    else{
        if(selectedActivityID != undefined){ // another is selected -
            clearActivitySelection();
        }
        
        selectedActivityID = activityId;
        element.classList += "selectedStudent";
        showButton("Students");
    }
}

// Removes any selected Activities (green) since we can only do one at a time
function clearActivitySelection(){
    var activitiesList = document.getElementById("activities");
    activitiesList = activitiesList.getElementsByTagName("li");
    for (var i = 0; i < activitiesList.length; i++){
        if(activitiesList[i].classList.contains("selectedStudent")){
            var oldSelection = activitiesList[i];
            oldSelection.classList.remove("selectedStudent");
            break;
        }
    }
    oldSelection.classList.remove("selectedStudent");
}

function hideActivities(){
    document.getElementById("activities").style.display = "none";
    activitiesHidden = true;
}
function showActivities(){
    document.getElementById("activities").style.display = "block";
    activitiesHidden = false;
}

function hideStudents(){
    document.getElementById("students").style.display = "none";
    studentsHidden = true;
}
function showStudents(){
    document.getElementById("students").style.display = "block";
    studentsHidden = false;
}

// The "Students" button was pushed when first coming to the page
function startWithStudents(){
    hideStartButtons();
    showStudents();
}

// The "Activities" button was pushed when first coming to the page
function startWithActivities(){
    hideStartButtons();
    showActivities();
}

// activity or student(s) was chosen and the "Select" button was clicked
function selectionMade(){
    hideElement(selectButton);
    
    if(activitiesHidden){ // students were selected first
        hideStudents();
        showActivities();
    }
    else{
        hideActivities();
        showStudents();
    }
    if(selectedActivityID != undefined){ showElement(submitButton); }
    toSubmit = true;
}

// activity and student(s) chosen, submit to database
function submitToDB(){
    var theUrl = window.location.href+'/addstudentActivity';

    for(var i = 0; i < selectedStudentIDs.length; i++){
        var data = data + "&stu=" + selectedStudentIDs[i];
        data = data + "&act=" + selectedActivityID;
        var callback = reloadIt;
    
        httpPostAsync(theUrl,data,callback);
    }
    
}

// Hides the active list (students or activities) and shows the inactive one
// Also hides the submit/back buttons and shows the select button.
function goBack(){
    if(studentsHidden){
        hideActivities();
        showStudents();
    }
    else{
        hideStudents();
        showActivities();
    }
    
    hideElement(submitButton);
    toSubmit = false;
    showButton(selectButton);
}



function hideStartButtons(){
    document.getElementById("selectionButtons").style.display = "none";
}
function hideElement(element) { 
    element.style.display = "none"; 
}
function showElement(element, displayType) { 
    element.style.display = displayType; 
}
