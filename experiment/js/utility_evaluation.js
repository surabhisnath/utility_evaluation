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

function loaddataprotection()
{
    clickStart("page_consent", "page_dataprotection");
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
    clickStart("page_dataprotection", "page_instructions");
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

// Generate 100 rows of sample data
const data1 = Array.from({ length: 10 }, (_, i) => ({
    object: `Object 1`,
    use: `Alternate Use 1_${i + 1}`
}));

const data2 = Array.from({ length: 5 }, (_, i) => ({
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
        console.log(ratings);
        // swal("Thank you! Your ratings have been submitted.");
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
        console.log(ratings);
        // swal("Thank you! Your ratings have been submitted.");
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
        console.log(ratings);
        // swal("Thank you! Your ratings have been submitted.");
        loadquestions();
    }
}

function loadquestions()
{
    clickStart("main_page3", "page_questionsintro");
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
}


function endexecution()
{
    if (document.fullscreenElement != null) 
    {
        cancelFullScreen();
    }

    // dictionary["end_time"] = gettimestamp();
    // dictionary["opencomments"] = document.getElementById('opencomments').value;
    // dictionary["average_clicks_per_grid"] = dictionary["clicks_per_grid"].reduce((a, b) => a + b, 0) / dictionary["clicks_per_grid"].length || 0;
    // jsPsych.data.get().push(dictionary);
    // saveData("data_" + dictionary["start_time"] + "__" + dictionary["end_time"] + "_" + subject_id, JSON.stringify(jsPsych.data.get()));
    // clickStart("page_questions6", "page_end");
}