//isupdate is set as false in order to check whether update is done or not 
let isUpdate=false;
//this is a global json object which will be used to update the changes in the local storage
let employeePayrollObj={};
//event listener basically waits for an event to occour
window.addEventListener('DOMContentLoaded', (event) => {
    //we are checking for update as soon as the page loads
    checkForUpdate();
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
      //we are checking for update 
      checkForUpdate();
});

// uc3 - defining the save method for saving all emp details
//this save method was already declared in the form onsubmit="save()";
const save = (event)=>{ 
    try{
        //prevents removing of data, if there is error in name or date
        event.preventDefault();
        //if there is error, then form will not be submitted
        event.stopPropagation();
        setEmployeePayrollObject(); 
        createAndUpdateStorage();
        /*//storing the value returned by the function
        let employeePayrollData=createEmployeePayroll(); 
        //calling function to store the employee data in it if is extracted in the above line properly
        createAndUpdateStorage(employeePayrollData);*/
        resetForm();
        //after resetting, moving back to home page.
        window.location.replace(site_properties.home_page);
    }
    catch(e)
    {
        return;
    }
};

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
               getInputValueById('#year') ;
    employeePayrollObj._startDate = date;
}
//we are updating the createandUpdateStorage
//earlier we were only cheacking is employeepayrolldata exists then add it to home page table
//now if we want to update we need to check if it exists and whether we are adding a new id or updating the existing one
function createAndUpdateStorage()
{
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));
    //check if list exists
    if(employeePayrollList)
    {
        let empPayrollData= employeePayrollList.find(empData=>empData._id==employeePayrollObj._id)
        //if data does not existfor a particular id directly push the data into list with a new id
        if(!empPayrollData)
        {
            employeePayrollList.push(createEmployeePayrollData());
        }
        else
        {
            //if that id exists find index for that and splice it 
            //first delete data on that index and then add that updated data
            const index= employeePayrollList.map(empData=>empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }
    }
    //otherwise pass the data in teh form of an array
    else
    {
        employeePayrollList=[createEmployeePayrollData()]
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));   
}
const createEmployeePayrollData = (id) => {
    //creating an instance of EmployeePayroll class
    let employeePayrollData = new EmployeePayRoll();
    //if id does not exist create new emp id
    if (!id) employeePayrollData.id = createNewEmployeeId();
    //else add in that id only
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}

//not being used after uc2 in day 41
 const createEmployeePayroll =()=>{
    let employeePayrollData = new EmployeePayRoll();
     try{
        //we have created an employeePayrollData object  
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
//not being used after day41 uc2  
/*function createAndUpdateStorage(employeePayrollData){
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
} */

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
const setTextValue=(id,value)=>
{
    const element= document.querySelector(id);
    element.textContent=value;
}

//uc4 called from reset form func
const setValue = (id, value) =>
{
    const element = document.querySelector(id);
    element.value = value; 
}

const checkForUpdate=()=>{
    //json object is created at the top of the page
    //we are getting the values stored in the local storage using editEmp which is the key
    //it will give us the data of that contact which we user wants to edit using editEmp key
    const employeePayrollJson= localStorage.getItem('editEmp');
    //if there is something in jsonobj then true else false
    isUpdate= employeePayrollJson?true:false;
    //if is update is false return
    if(!isUpdate) return;
    //now we are converting this employeepayrolljson into jsonobj to store into a global variable
    employeePayrollObj= JSON.parse(employeePayrollJson);
    setForm();
}
//setting the function in the form
const setForm = () => {
    //using the details in the json object we are setting the form fields
    //calling the set value func
    setValue('#name', employeePayrollObj._name);
    //calling the selected value sfunction to set values
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    // we are converting date to 12 Nov 2018 format then splitting and storing in the form of an array
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

//set selected values is called when we have multiple options and want to tick one or more
//like for gender, department,profilepic
//here property is suppose profilepic and value is the option ticked for that
const setSelectedValues = (propertyValue, value) => {
    //getting all the items in allitems
    let allItems = document.querySelectorAll(propertyValue);
    //iterating through allitems
    allItems.forEach(item => {
        //then checking if values is an array or not 
        //for example for deparment it will be an array and gender it will be a single value
        if(Array.isArray(value)) {
            //if it is an array
            //checking if value includes item.value then it is ticked
            //it will check all the options
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        //if it is not an array 
        //when item value matches with value
        //it is checked true or ticked
        else if (item.value === value)
            item.checked = true;
    });    
}
