app.service("myService", function ($http) {

    //get All Employee
    this.getEmployees = function () {
        return $http.get("/Employee/getAll");
    };

    this.AddEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "/Employee/AddEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        });
        return response;
    }


    this.getEmployee = function (employeeID) {
        var response = $http({
            method: "post",
            url: "/Employee/getEmployeeByNo",
            params: {
                id: JSON.stringify(employeeID)
            }
        });
        return response;
    }


    this.updateEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "/Employee/UpdateEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        });
        return response;
    }

    this.GetDesignations = function () {
        return $http.get("/Employee/GetDesignations");
    };


    this.GetDepartment = function () {
        return $http.get("/Employee/GetDepartments");
    };
});