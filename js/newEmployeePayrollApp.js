
//event listener basically waits for an event to occour
window.addEventListener('DOMContentLoaded', (event) => {
    //uc2- validating name
    var name = document.querySelector('#name');
    var textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayRoll()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    //uc2 validating salary
    var salary = document.querySelector('#salary');
    var output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });  
    var day = document.querySelector('#day');
    var month = document.querySelector('#month');
    var year = document.querySelector('#year');
    var dateError = document.querySelector('.date-error');
    day.addEventListener('input', function(){
        if(day.value!="--Select Day--" && month.value!="" && year.value!=""){
            checkDate();
        }
    });
    month.addEventListener('input', function(){
        if(day.value!="" && month.value!="--Select Month--" && year.value!=""){
            checkDate();
        }
    });
    year.addEventListener('input', function(){
        if(day.value!="" && month.value!="" && year.value!="--Select Year--"){
            checkDate();
        }
    });
    function checkDate(){
        try{
            let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
            date = Date.parse(date);
            (new EmployeePayRoll()).startDate = date;
            dateError.textContent = "";
        }catch(e){
            dateError.textContent = e;
        }
    }
});

// uc3 - defining the save method for saving all emp details
//this save method was already declared in the form onsubmit="save()";
const save = ()=>{ 
    try{
        //storing the value returned by the function
        let employeePayrollData=createEmployeePayroll(); 
        //calling function to store the employee data in it if is extracted in the above line properly
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e)
    {
        return;
    }
};
 const createEmployeePayroll =()=>{
    let employeePayrollData = new EmployeePayRoll();
     try{
        //we have created an employeePayrollData object at top 
        //getting the name value from user and storing it in name attribute of class and validating also
         employeePayrollData.name=getInputValueById('#name');
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    //employeePayrollData.id=getInputValueById('#id');
    //getSelectedValue is a function created at bottom to  get properties which have multiple values
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    //getinputvaluesbyid is a function created at bottom to get info by id
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
                      getInputValueById('#year') ;
        try {
            employeePayrollData.startDate = new Date(startDate);
        } catch (e) {
            setTextValue('.date-error', e);
            throw e;
        }
        alert(employeePayrollData.toString());
    return employeePayrollData;
};

//function called by createemployeepayroll to get multiple values
const getSelectedValues = (propertyValue) =>
    {
        //an array to store all the values like of gender male and female
        let allItems = document.querySelectorAll(propertyValue); 
        //empty array to get value selected by user can also be multiple like for department
        let sellItems = [];
        //iterating through each item
        allItems.forEach(item => 
        {
            //item is choosen by user it is pushes into sellitems
            if(item.checked) 
            sellItems.push(item.value);
        });
        return sellItems;
    }

//function called by createemployeepayroll to get single value by id     
const getInputValueById=(id)=>
    {
        let value=document.querySelector(id).value;
        return value;
    }

// this method id not used anywhere just could be a replacement for above method 
const getInputElementValue = (id) =>
    {
        let value = document.getElementById(id).value;
        return value; 
    }    

//uc4 storing in local storage    
function createAndUpdateStorage(employeePayrollData){
    //we have an inbuilt function of local storage
    //localstorage.getitem() is getting all item from list
    //json will convert this json string into an object
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    //if this list is not undefined then it will push the data into it 
    //otherwise it make a new list and put the first entry in this list 
    //next time when this list is used it will go  with the if statement 
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
    //alert is used for poping up
    alert(employeePayrollList.toString());
    //converting object back to json string format
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
} 

//uc5 reset button which is being called by the form 
//we are either setting or unsetting the values to empty or some specific value
const resetForm = () =>
{ 
    setValue('#name',''); 
    unsetSelectedValues('[name=profile]'); 
    unsetSelectedValues('[name=gender]'); 
    unsetSelectedValues('[name=department]'); 
    setValue('#salary', ' '); 
    setValue('#notes',' ');
    setValue('#date','--Select Day--');
    setValue('#month','--Select Month--');
    setValue('#year','--Select Year--');
}
 
//uc4 called from reset form func
const unsetSelectedValues = (propertyValue) => 
{ 
    let allItems = document.querySelectorAll(propertyValue); 
    allItems.forEach(item => { item.checked = false; }
        );
} 
  
//uc4-called from reset form func
const setTextValue = (id, value) => 
{
    //setting the by extracting through id
    const element = document.querySelector(id); 
    element.textContent = value; 
} 

//uc4 called from reset form func
const setValue = (id, value) =>
{
    const element = document.querySelector(id);
    element.value = value; 
}