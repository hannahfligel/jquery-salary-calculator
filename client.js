$( document ).ready( readyNow );

const budget = 20000;
let employees = [];

function addEmployee(){
    console.log('in addEmployee');
    //get user input create a new object
    let newEmployee = {
        firstName: $('#firstNameIn').val(),
        lastName: $('#lastNameIn').val(),
        idNumber: $('#idNumberIn').val(),
        jobTitle: $('#jobTitleIn').val(),
        annualSalary: $('#annualSalaryIn').val()
    }
    //push the new employee into the array 
    employees.push(newEmployee);
    //empty inputs 
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#idNumberIn').val('');
    $('#jobTitleIn').val('');
    $('#annualSalaryIn').val('');
    //calculate remainingBudget
    calculateTotalCost();
    //update DOM
    displayEmployees();
}//end addEmployee

function calculateTotalCost(){
    console.log('in calculateTotalCost');
    //loop through employee array 
    let totalSalaries=0;
    for (let i=0; i<employees.length; i++){
    //for each employee, add up total of all salaries
    totalSalaries += Number(employees[i].annualSalary);
    }//end for loop
    console.log('totalSalaries:', totalSalaries);
    //display remainingBudget
    let el = $('#remainingBudgetOut');
    el.empty();
    el.append( totalSalaries );
    //create an if statement to turn color red if the total cost is over $20000
    if(totalSalaries>budget){
        el.css("background", "red");

    }
}

function displayEmployees(){
    console.log( 'in displayEmployees ');
    //target output by ID 
    let el = $('.tableRow');
    //empty
    el.empty();
    //loop through purchses array
    for( employee of employees ){
    //for each purchase, create list item 
    el.append(`
        <tr>
            <td> ${employee.firstName} </td>
            <td> ${employee.lastName}</td>
            <td> ${employee.idNumber}</td>
            <td> ${employee.jobTitle}</td>
            <td> ${employee.annualSalary}</td>
         </tr>` );
    }//end for of
}//end displayEmployees

function readyNow(){
    //display budget 
    //target budgetOut by id 
    let el = $( '#budgetOut' );
    el.empty();
    el.append( budget );
    //handle click event
    $( '#addEmployeeButton' ).on( 'click', addEmployee ); 
    //init display
    calculateTotalCost();
}//end readyNow


