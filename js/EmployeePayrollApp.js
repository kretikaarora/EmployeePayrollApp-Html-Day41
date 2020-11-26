class EmployeePayRoll 
{
    //we are adding this id to use it in the form by which we will update delete and find values
    get id(){return this._id;}
    set(id){
        this._id=id;
    }

    get name() { return this._name; }
    set name(name) { 
      //validating only name with min 3 letters and first letter caps is allowed  
      let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
      if (nameRegex.test(name))
        this._name = name; 
      else throw 'Name is Incorrect!';
    }

    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) { 
     this._profilePic = profilePic; 
    }

   get gender() { return this._gender; }
   set gender(gender) { 
     this._gender = gender; 
   }
 
   get department() { return this._department; }
   set department(department) { 
     this._department = department; 
   }
 
   get salary() { return this._salary; }
   set salary(salary) { 
     this._salary = salary; 
   }
 
   get note() { return this._note; }
   set note(note) { 
     this._note = note; 
   }

   get startDate() { return this._startDate; }
   set startDate(startDate) {
       let currentDAte = new Date();
       if (Date.parse(currentDAte) - startDate >= 0) {
           this._startDate = startDate;
        } else {
           throw 'Invalid Date';
        }
    }
    toString() {
      //giving the type of date required
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      //if start date is not in the given datatype it will pass the value undefined to empdate
     const empDate = !this.startDate ? "undefined" : this.startDate;
      //here in return for start date we are passing empDate as value                
      return "id=" + this.id + ", name='" + this.name + ", gender='" + this.gender + 
             ", profilePic='" + this.profilePic + ", department=" + this.department +
             ", salary=" + this.salary + ", startDate=" + empDate + ", note=" + this.note;
    }  
}