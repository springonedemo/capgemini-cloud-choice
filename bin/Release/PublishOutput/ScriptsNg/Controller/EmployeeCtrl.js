app.controller("EmployeeCtrl", function ($scope, myService) {
    GetAllEmployees();

    //For sorting according to columns
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    //To Get All Records  
    function GetAllEmployees() {
        var getData = myService.getEmployees();

        getData.then(function (emp) {
            $scope.employees = emp.data;
        }, function (emp) {
            alert("Records gathering failed!");
        });
    }

    $scope.AddEmployeeDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        GetDepartments();
        GetDesignations();
    }
    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    };


    function GetDesignations() {
        var desg = myService.GetDesignations();

        desg.then(function (dsg) {
            $scope.designations = dsg.data;
        }, function (dsg) {
            $("#alertModal").modal('show');
            $scope.msg = "Error in filling designation drop down !";
        });
    }

    function GetDepartments() {
        var departments = myService.GetDepartment();

        departments.then(function (dep) {
            $scope.departments = dep.data;
        }, function (dep) {
            $("#alertModal").modal('show');
            $scope.msg = "Error in filling departments drop down !";
        });
    }

    $scope.editEmployee = function (employee) {
        GetDesignations();
        GetDepartments();
        var getData = myService.getEmployee(employee.Id);
        getData.then(function (emp) {
            $scope.employee = emp.data;
            $scope.employeeId = employee.Id;
            $scope.employeeName = employee.Name;
            $scope.employeeDOB = employee.DOB;
            $scope.employeeGender = employee.Gender;
            $scope.employeeEmail = employee.Email;
            $scope.employeeMobile = employee.Mobile;
            $scope.employeeAddress = employee.Address;
            $scope.employeeJoiningDate = new Date(employee.JoiningDate);
            $scope.employeeDepartment = employee.DepartmentId;
            $scope.employeeDesignation = employee.DesignationId;
            $scope.Action = "Edit";
            $("#myModal").modal('show');
        },
            function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
    }

    $scope.AddUpdateEmployee = function () {
        var Employee = {
            Name: $scope.employeeName,
            DOB: $scope.employeeDOB,
            Gender: $scope.employeeGender,
            Email: $scope.employeeEmail,
            Mobile: $scope.employeeMobile,
            Address: $scope.employeeAddress,
            JoiningDate: $scope.employeeJoiningDate,
            DepartmentID: $scope.employeeDepartment,
            DesignationID: $scope.employeeDesignation
        };

        var getAction = $scope.Action;

        if (getAction == "Edit") {
            Employee.Id = $scope.employeeId;
            var getData = myService.updateEmp(Employee);
            getData.then(function (msg) {
                GetAllEmployees();
                ClearFields();
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            }, function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
        }
        else {
            var getData = myService.AddEmp(Employee);
            getData.then(function (msg) {
                GetAllEmployees();
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
                ClearFields();

            }, function (msg) {
                $("#alertModal").modal('show');
                $scope.msg = msg.data;
            });
        }
        GetAllEmployees();
        //$scope.refresh();
    }

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    function ClearFields() {
        $scope.employeeId = "";
        $scope.employeeName = "";
        $scope.employeeDOB = "";
        $scope.employeeGender = "";
        $scope.employeeEmail = "";
        $scope.employeeMobile = "";
        $scope.employeeAddress = "";
        $scope.employeeJoiningDate = "";
        $scope.employeeDepartment = "";
        $scope.employeeDesignation = "";
    }
});

/*$(document).ready(function () {
    $(function () {
        $("#datetimepicker").datetimepicker();
    });
});*/