var subject_id = Math.random().toString(36).substr(2, 8);
const timestamp = gettimestamp();
var slider1moved = false;
var slider2moved = false;
var slider3moved = false;
var slider4moved = false;
var slider5moved = false;
var dictionary = {
    "subject_id": subject_id,
    "start_time": timestamp,
    "end_time": "",

    "objectsinorder": [],
    "responses1": [],
    "responses2": [],
    "responses3": [],

    "ratings1": [],
    "ratings2": [],
    "ratings3": [],

    "ratings1clicks": [],
    "ratings2clicks": [],
    "ratings3clicks": [],

    "gender": "",
    "age": "",
    "nationality": "",
    "device": "",
    "mouse": "",

    "strategy": "",
    "strategy_mcq": [],
    "utility1": "",
    "utility2": "",
    "utility3": "",
    "utility4": "",
    "utility5": "",

    "spread": -1,
    "bias": -1,
    "consistency": -1,
    "confidence": -1,
    "difficulty": -1,
    "objectdifference": "",
    "consistencyovertime": -1,
    "noveltycreativityconfound": -1,

    "opencomments": ""
};

function twoDigit(n) {
    if(n < 10) {
        return "0" + n;
    } 
    else {
        return n;
    }
}

function threeDigit(n) {
    if(n < 10) {
        return "00" + n;
    } 
    else if(n < 100) {
        return "0" + n;
    } 
    else {
        return n;
    }
}

function gettimestamp(subset = 0)
{
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var millisecond = date.getMilliseconds();
    if (subset == 1)
        return twoDigit(hour) + "-" + twoDigit(minute) + "-" + twoDigit(second) + "-" + threeDigit(millisecond);
    if (subset == 2)
        return date;
    return year + "-" + twoDigit(month + 1) + "-" + twoDigit(day) + "-" + twoDigit(hour) + "-" + twoDigit(minute) + "-" + twoDigit(second) + "-" + threeDigit(millisecond);
}

function clickStart(hide, show) 
{
    document.getElementById(hide).style.display = "none";
    document.getElementById(show).style.display = "block";
    window.scrollTo(0, 0);
}

function cancelFullScreen() {
    var el = document;
    var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function requestFullScreen(element) 
{
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function loadconsent()
{
    clickStart("page_welcome", "page_consent");
    var elem = document.body;
	requestFullScreen(elem);
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

function loadconsent2()
{
    clickStart("page_consent", "page_consent2");
    var elem = document.body;
	requestFullScreen(elem);
}

function exit(page)
{
    if (document.fullscreenElement != null) 
    {
        cancelFullScreen();
    }

    if (page == "page_main")
    {
        document.getElementById("canvas").remove();
        clickStart(page, "page_timeout");
        clearInterval(interval);
        clearInterval(timeoutinterval);
    }

    else
        clickStart(page, "page_exit");
}

function loadinstructions()
{
    clickStart("page_consent2", "page_instructions");
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

function loadinstructions2()
{
    clickStart("page_instructions", "page_instructions2");
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

function loadmain1()
{
    clickStart("page_instructions2", "main_page1");
    createTable1();
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

function loadmain2()
{
    clickStart("main_page1", "main_page2");
    createTable2();
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

function loadmain3()
{
    clickStart("main_page2", "main_page3");
    createTable3();
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

objects = ["belt", ""];


// Generate 100 rows of sample data
const data1 = Array.from({ length: 3 }, (_, i) => ({
    object: `Object 1`,
    use: `Alternate Use 1_${i + 1}`
}));

const data2 = Array.from({ length: 1 }, (_, i) => ({
    object: `Object 2`,
    use: `Alternate Use 2_${i + 1}`
}));

const data3 = Array.from({ length: 1 }, (_, i) => ({
    object: `Object 3`,
    use: `Alternate Use 3_${i + 1}`
}));

// Function to dynamically create the table
function createTable1() {
    tableBody1 = document.getElementById('ratingTable1');

    data1.forEach((item, index) => {
        // Create a new row
        const row = document.createElement('tr');

        // Create cells for object, use, and rating
        const objectCell = document.createElement('td');
        objectCell.textContent = item.object;
        row.appendChild(objectCell);

        const useCell = document.createElement('td');
        useCell.textContent = item.use;
        row.appendChild(useCell);

        const ratingCell = document.createElement('td');
        ratingCell.className = 'number-boxes';

        // Create the 5 number boxes
        for (let i = 1; i <= 5; i++) {
        const numberBox = document.createElement('div');
        numberBox.className = 'number-box';
        numberBox.textContent = i;

        // Handle box click
        numberBox.addEventListener('click', () => {
            if (numberBox.classList.contains('selected')) {
            // If the box is already selected, deselect it
            numberBox.classList.remove('selected');
            } else {
            // Otherwise, deselect all siblings and select the clicked box
            ratingCell.querySelectorAll('.number-box').forEach(box => box.classList.remove('selected'));
            numberBox.classList.add('selected');
            }
        });

        ratingCell.appendChild(numberBox);
        }

        row.appendChild(ratingCell);
        tableBody1.appendChild(row);
    });
}

// Function to handle the submission of ratings
function submitRatings1() 
{
    const ratings = [];
    let allRated = true;

    tableBody1.querySelectorAll('tr').forEach((row, index) => {
        const selectedBox = row.querySelector('.number-box.selected');

        if (selectedBox) {
        ratings.push({
            object: data1[index].object,
            use: data1[index].use,
            rating: selectedBox.textContent
        });
        } else {
        allRated = false;
        }
    });

    if (!allRated) {
        swal("Please rate all items before submitting.");
    } 

    else {
        dictionary["ratings1"] = ratings
        console.log(dictionary["ratings1"]);
        swal("Thank you for completing the first set of ratings. Please proceed to next object.");
        loadmain2();
    }
}

function createTable2() 
{
    tableBody2 = document.getElementById('ratingTable2');
    
    data2.forEach((item, index) => {
        // Create a new row
        const row = document.createElement('tr');
    
        // Create cells for object, use, and rating
        const objectCell = document.createElement('td');
        objectCell.textContent = item.object;
        row.appendChild(objectCell);
    
        const useCell = document.createElement('td');
        useCell.textContent = item.use;
        row.appendChild(useCell);
    
        const ratingCell = document.createElement('td');
        ratingCell.className = 'number-boxes';
    
        // Create the 5 number boxes
        for (let i = 1; i <= 5; i++) {
        const numberBox = document.createElement('div');
        numberBox.className = 'number-box';
        numberBox.textContent = i;
    
        // Handle box click
        numberBox.addEventListener('click', () => {
            if (numberBox.classList.contains('selected')) {
            // If the box is already selected, deselect it
            numberBox.classList.remove('selected');
            } else {
            // Otherwise, deselect all siblings and select the clicked box
            ratingCell.querySelectorAll('.number-box').forEach(box => box.classList.remove('selected'));
            numberBox.classList.add('selected');
            }
        });
    
        ratingCell.appendChild(numberBox);
        }
    
        row.appendChild(ratingCell);
        tableBody2.appendChild(row);
    });
}
    
// Function to handle the submission of ratings
function submitRatings2() 
{
    const ratings = [];
    let allRated = true;

    tableBody2.querySelectorAll('tr').forEach((row, index) => {
        const selectedBox = row.querySelector('.number-box.selected');

        if (selectedBox) {
        ratings.push({
            object: data2[index].object,
            use: data2[index].use,
            rating: selectedBox.textContent
        });
        } else {
        allRated = false;
        }
    });

    if (!allRated) {
        swal("Please rate all items before submitting.");
    } 

    else {
        dictionary["ratings2"] = ratings
        console.log(dictionary["ratings2"]);
        swal("Thank you for completing the first second of ratings. Please proceed to last object.");
        loadmain3();
    }
}

function createTable3() 
{
    tableBody3 = document.getElementById('ratingTable3');
    
    data3.forEach((item, index) => {
        // Create a new row
        const row = document.createElement('tr');
    
        // Create cells for object, use, and rating
        const objectCell = document.createElement('td');
        objectCell.textContent = item.object;
        row.appendChild(objectCell);
    
        const useCell = document.createElement('td');
        useCell.textContent = item.use;
        row.appendChild(useCell);
    
        const ratingCell = document.createElement('td');
        ratingCell.className = 'number-boxes';
    
        // Create the 5 number boxes
        for (let i = 1; i <= 5; i++) {
        const numberBox = document.createElement('div');
        numberBox.className = 'number-box';
        numberBox.textContent = i;
    
        // Handle box click
        numberBox.addEventListener('click', () => {
            if (numberBox.classList.contains('selected')) {
            // If the box is already selected, deselect it
            numberBox.classList.remove('selected');
            } else {
            // Otherwise, deselect all siblings and select the clicked box
            ratingCell.querySelectorAll('.number-box').forEach(box => box.classList.remove('selected'));
            numberBox.classList.add('selected');
            }
        });
    
        ratingCell.appendChild(numberBox);
        }
    
        row.appendChild(ratingCell);
        tableBody3.appendChild(row);
    });
}
    
// Function to handle the submission of ratings
function submitRatings3() 
{
    const ratings = [];
    let allRated = true;

    tableBody3.querySelectorAll('tr').forEach((row, index) => {
        const selectedBox = row.querySelector('.number-box.selected');

        if (selectedBox) {
        ratings.push({
            object: data3[index].object,
            use: data3[index].use,
            rating: selectedBox.textContent
        });
        } else {
        allRated = false;
        }
    });

    if (!allRated) {
        swal("Please rate all items before submitting.");
    } 

    else {
        dictionary["ratings3"] = ratings
        console.log(dictionary["ratings3"]);
        loadquestions();
    }
}

function loadquestions()
{
    clickStart("main_page3", "page_questionsintro");
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}

function gotoquestions1()
{
    clickStart("page_questionsintro", "page_questions1");
    var elem = document.body;
	requestFullScreen(elem);
}

function gotoquestions2()
{
    var checkq1 = document.querySelector('input[name="q1"]:checked');
    var checkq2 = document.getElementById('age').value;
    var checkq3 = document.getElementById('nationality').value;
    var checkq4 = document.querySelector('input[name="q4"]:checked');
    var checkq5 = document.querySelector('input[name="q5"]:checked');
    
    if (checkq1 == null || checkq2 == "" || checkq3 == "" || checkq4 == null || checkq5 == null)
        swal("Some questions have missing responses!")
    else
    {
        dictionary["gender"] = checkq1.value;
        dictionary["age"] = checkq2;
        dictionary["nationality"] = checkq3;
        dictionary["device"] = checkq4.value;
        dictionary["mouse"] = checkq5.value;
        clickStart("page_questions1", "page_questions2");
        var elem = document.body;
		requestFullScreen(elem);
    }
}

function gotoquestions3()
{

    var checkbeh1 = document.getElementById('strategy').value;

    var checkmcq1 = document.querySelector('input[name="featurematching"]:checked');
    var checkmcq2 = document.querySelector('input[name="simulation"]:checked');
    var checkmcq3 = document.querySelector('input[name="disassembly"]:checked');
    var checkmcq4 = document.querySelector('input[name="reasoning"]:checked');
    var checkmcq5 = document.querySelector('input[name="consistency"]:checked');
    var checkmcq6 = document.querySelector('input[name="other"]:checked');

    var checkbeh2 = document.getElementById('utility1').value;
    var checkbeh3 = document.getElementById('utility2').value;
    var checkbeh4 = document.getElementById('utility3').value;
    var checkbeh5 = document.getElementById('utility4').value;
    var checkbeh6 = document.getElementById('utility5').value;

    if (checkbeh1 == "" || checkbeh2 == "" || checkbeh3 == "" || checkbeh4 == "" || checkbeh5 == "" || checkbeh6 == "")
    swal("Some questions have missing responses!");

    else if (checkmcq1 == null && checkmcq2 == null && checkmcq3 == null && checkmcq4 == null && checkmcq5 == null && checkmcq6 == null)
        swal("Some questions have missing responses!")

    else
    {
        dictionary["strategy"] = checkbeh1;
        dictionary["strategy_mcq"] = dictionary["strategy_mcq"].concat([checkmcq1, checkmcq2, checkmcq3, checkmcq4, checkmcq5, checkmcq6]);
        dictionary["utility1"] = checkbeh2;
        dictionary["utility2"] = checkbeh3;
        dictionary["utility3"] = checkbeh4;
        dictionary["utility4"] = checkbeh5;
        dictionary["utility5"] = checkbeh6;
        
        clickStart("page_questions2", "page_questions3");
        var elem = document.body;
        requestFullScreen(elem);

        document.getElementById('span').addEventListener('input', function() {slider1moved = true;})
        document.getElementById('bias').addEventListener('input', function() {slider2moved = true;})
        document.getElementById('consistency').addEventListener('input', function() {slider3moved = true;})
        document.getElementById('confidence').addEventListener('input', function() {slider4moved = true;})
        document.getElementById('difficulty').addEventListener('input', function() {slider5moved = true;})
    }
}

function gotoquestions4()
{
    if (slider1moved == false || slider2moved == false || slider3moved == false || slider4moved == false || slider5moved == false)
        swal("Some questions have missing responses!");
    else
    {
        var checkslider1 = document.getElementById('span').value;
        var checkslider2 = document.getElementById('bias').value;
        var checkslider3 = document.getElementById('consistency').value;
        var checkslider4 = document.getElementById('confidence').value;
        var checkslider5 = document.getElementById('difficulty').value;
        dictionary["span"] = checkslider1;
        dictionary["bias"] = checkslider2;
        dictionary["consistency"] = checkslider3;
        dictionary["confidence"] = checkslider4;
        dictionary["difficulty"] = checkslider5;
        clickStart("page_questions3", "page_questions4");
        var elem = document.body;
        requestFullScreen(elem);
    }
}

function endexecution()
{
    if (document.fullscreenElement != null) 
    {
        cancelFullScreen();
    }

    dictionary["end_time"] = gettimestamp();
    dictionary["opencomments"] = document.getElementById('opencomments').value;
    console.log(dictionary);
    // jsPsych.data.get().push(dictionary);
    // saveData("data_" + dictionary["start_time"] + "__" + dictionary["end_time"] + "_" + subject_id, JSON.stringify(jsPsych.data.get()));
    saveData("data_" + dictionary["start_time"] + "__" + dictionary["end_time"] + "_" + subject_id, JSON.stringify(dictionary, null, 2));
    clickStart("page_questions4", "page_end");
}

function saveData(name, data)
{
    var filename = "./data/" + name + ".json";
    $.post("write_data.php", {postresult: data + "\n", postfile: filename })
}