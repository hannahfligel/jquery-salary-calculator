$( document ).ready( readyNow );

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
    $( '.tableRow' ).on( 'click', '.deleteRowButton', deleteRow)
}//end readyNow

const budget = 20000;
let employees = [];

function addEmployee(){
    console.log('in addEmployee');
    let alertEl = $('#alert');
    alertEl.empty();
    //get user input create a new object
        let newEmployee = {
            firstName: $('#firstNameIn').val(),
            lastName: $('#lastNameIn').val(),
            idNumber: Number($('#idNumberIn').val()),
            jobTitle: $('#jobTitleIn').val(),
            annualSalary: $('#annualSalaryIn').val()
        }
        //push the new employee into the array 
        if(newEmployee.firstName === "" || newEmployee.lastName === "" || newEmployee.idNumber === 0 || newEmployee.jobTitle === "" || newEmployee.annualSalary === 0 ){
            alertEl.append(`
            <div class="alert alert-danger" role="alert">
            One or more fields are missing!
            </div>
            `);
        }//end if
        else{
            employees.push(newEmployee);
        }//end else 

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
    let totalExceededAlert= $(`#totalExceeded`);
    el.empty(); 
    el.append( totalSalaries );
    //create an if statement to turn color red if the total cost is over $20000
    if(totalSalaries>budget){
        totalExceededAlert.append(`
        <div class="alert alert-danger center" role="alert">
        Budget exceeded!
        </div>
        `);
        el.css("background", "red" );
    }
    else{
        el.css("background", "#F8F9FA");
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
                    <td class="idNum"> ${employee.idNumber}</td>
                    <td> ${employee.jobTitle}</td>
                    <td> $${employee.annualSalary}</td>
                    <td><button type="button" class="deleteRowButton btn btn-danger">Remove</button></td>
                </tr>` );

    }//end loop 
}//end displayEmployees


function deleteRow(){
    console.log("delete");
    $(this).parent().parent().remove();
    let removedEmployee = Number($(this).parent().parent().find('.idNum').text());
    console.log("Employee to Delete", removedEmployee);
    let holdEmployees=[];
    for (i=0; i<employees.length; i++){
        if(removedEmployee !== employees[i].idNumber){
            holdEmployees.push(employees[i]);
        }//end if
    }//end for 
    employees = holdEmployees;
    calculateTotalCost();
}





//TO DO:
//1. if nothing is entered, display an alert that nothing was entered 
//2. no defult val for id number and salary 
//3. alert if you go over budget 