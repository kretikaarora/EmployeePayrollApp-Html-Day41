// employee payroll is an array which will contain objects read from local storage
// using this we will populate th table
let empPayrollList;
//as soon the page loades we want this inner html function to be called
window.addEventListener('DOMContentLoaded',(event)=>
{
    //caling to read from local storage
    empPayrollList= getEmployeePayrollDataFromStorage();
    createInnerHtml();
    //updating the count of elements by setting textcontent to lenth of
    document.querySelector(".emp-count").textContent= empPayrollList.length;
    localStorage.removeItem('editEmp');
});

//calling from eventlistener as soon as the web page is loaded
const getEmployeePayrollDataFromStorage= ()=>{
    //it will go the local storage fetch the info if it is there convert to json otherwise return empty list
    return localStorage.getItem('EmployeePayrollList')?JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

//creating inner html to dynamically input data during run time from js file
//we are using template literals which allows embedded expression
//template literals are enclosed by a backticl ``
//we can also inject expressions in template literal using $ sign
const createInnerHtml=()=>{
    if(empPayrollList.length==0) return;
    const headerHtml= "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    //using template literal
    let innerHtml= `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
    innerHtml= `${innerHtml}
    <tr>
          <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>${getDeptHtml(empPayrollData._department)}
          </td>
          <td>${empPayrollData._salary}</td>
          <td>${stringifyDate(empPayrollData._startDate)}</td>
          <td><img id="${empPayrollData._id}" onclick= "remove(this)" alt="delete" src="../assets/delete-black-18dp (1).svg">
            <img id="${empPayrollData._id}" onclick= "update(this)" alt="edit" src="../assets/create-black-18dp (1).svg "></td>
    </tr>`;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

//since we can have multiple departments so using for loop fetching each department
const getDeptHtml= (deptList)=>
{
    let deptHtml='';
    for(const dept of deptList)
    {
        //the format is similar like we were doing for inner html
        //we are printing value for each dept in json file
        deptHtml= `${deptHtml}
        <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}  

//uc1-Remove function
//Function to delete the contact using icon of remove
//Above in the createinner html we are pasing onclick="remove(this)"
//here this is node that is passed 
const remove= (node)=>{
  //using empPayrollList we are retrieving the employee data  whose employee id is same as node id
  let empPayrollData= empPayrollList.find(empData=>empData._id=node.id);
  //if data does not exist then function is returned
  if(!empPayrollData) return;
  //employeepayrolllist is converted into a map array of ids for finding index
  const index= empPayrollList.map(empData=>empData._id).indexOf(empPayrollData.id);
  //using splice to remove element from array
  empPayrollList.splice(index,1);
  //setting into local storage by converting into json format
  localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
  //we are updating the count here itself so that there is no lag 
  document.querySelector(".emp-count").textContent= empPayrollList.length;
  //showing updated data of local storage
 createInnerHtml();
}

//creating a employeepayroll data in json format called from createinnerhtml function
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
      {       
        _name: 'Daisy',
        _gender: 'female',
        _department: [
            'Engineering',
            'Finance'
        ],
        _salary: '500000',
        _startDate: '29 Oct 2019',
        _note: '',
        _id: new Date().getTime(),
        _profilePic: '..\assets\Ellipse 1.png'
      },
      {
        _name: 'James',
        _gender: 'male',
        _department: [
            'Sales'
        ],
        _salary: '400000',
        _startDate: '15 Nov 2016',
        _note: '',
        _id: new Date().getTime() + 1,
        _profilePic: '..\assets\Ellipse -5.png'
      }
    ];
    return empPayrollListLocal;
  }

