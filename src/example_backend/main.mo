
import Array "mo:base/Array";

actor {
  stable var departmentss : [Department] = [];

  public type Department = {
    depId : Text;
    depName : Text;
  };

 

  public query func getDepartments() : async [Department] {
    return departmentss;
  };

  public func addDepartment(depId : Text, depName : Text) : async () {
    let depart : [Department] = [{ depId; depName }];
      departmentss := Array.append(departmentss, depart);
  };

};
