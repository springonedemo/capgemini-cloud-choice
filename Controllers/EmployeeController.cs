using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestApplication.Models;

namespace TestApplication.Controllers
{
    public class EmployeeController : Controller
    {
        public ActionResult Employee()
        {
            return View();
        }

        //For getting the all records from database.		
        public JsonResult getAll()
        {
            using (TestDatabaseEntities3 dataContext = new TestDatabaseEntities3())
            {
                var employeeList = (from E in dataContext.Employees
                                    join dep in dataContext.Departments on E.DepartmentId equals dep.Id
                                    join dsg in dataContext.Designations on E.DesignationId equals dsg.Id
                                    orderby E.Id
                                    select new
                                    {
                                        E.Id,
                                        E.Name,
                                        E.DOB,
                                        E.Gender,
                                        E.Email,
                                        E.Mobile,
                                        E.Address,
                                        E.JoiningDate,
                                        dep.DepartmentName,
                                        E.DepartmentId,
                                        dsg.DesignationName,
                                        E.DesignationId
                                    }).ToList();
                var JsonResult = Json(employeeList, JsonRequestBehavior.AllowGet);
                JsonResult.MaxJsonLength = int.MaxValue;
                return JsonResult;
            }
        }

        public string AddEmployee(Employee Emp)
        {
            if (Emp != null)
            {
                using (TestDatabaseEntities3 dataContext = new TestDatabaseEntities3())
                {
                    Employee employee = new Employee();
                    employee.Name = Emp.Name;
                    employee.DOB = Convert.ToDateTime(Emp.DOB).ToString("yyyy/MM/dd");
                    employee.Gender = Emp.Gender;
                    employee.Email = Emp.Email;
                    employee.Mobile = Emp.Mobile;
                    employee.Address = Emp.Address;
                    employee.JoiningDate = Convert.ToDateTime(Emp.JoiningDate).ToString("yyyy/MM/dd");
                    employee.DepartmentId = Emp.DepartmentId;
                    employee.DesignationId = Emp.DesignationId;
                    dataContext.Employees.Add(employee);
                    dataContext.SaveChanges();
                    return "Employee added Successfully";
                }
            }
            else
            {
                return "Addition of Employee unsucessfull !";
            }
        }


        public JsonResult getEmployeeByNo(string EmpNo)
        {
            try
            {
                using (TestDatabaseEntities3 dataContext = new TestDatabaseEntities3())
                {
                    int no = Convert.ToInt32(EmpNo);
                    var employeeList = dataContext.Employees.Find(no);
                    return Json(employeeList, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception exp)
            {
                return Json("Error in getting record !", JsonRequestBehavior.AllowGet);
            }

        }


        public string UpdateEmployee(Employee Emp)
        {
            if (Emp != null)
            {
                using (TestDatabaseEntities3 dataContext = new TestDatabaseEntities3())
                {
                    int no = Convert.ToInt32(Emp.Id);
                    var employeeList = dataContext.Employees.Where(x => x.Id == no).FirstOrDefault();
                    employeeList.Name = Emp.Name;
                    employeeList.DOB = Convert.ToDateTime(Emp.DOB).ToString("yyyy/MM/dd");
                    employeeList.Gender = Emp.Gender;
                    employeeList.Email = Emp.Email;
                    employeeList.Mobile = Emp.Mobile;
                    employeeList.Address = Emp.Address;
                    employeeList.JoiningDate = Convert.ToDateTime(Emp.JoiningDate).ToString("yyyy/MM/dd");
                    employeeList.DepartmentId = Emp.DepartmentId;
                    employeeList.DesignationId = Emp.DesignationId;
                    dataContext.SaveChanges();
                    return "Employee Updated Successfully";
                }
            }
            else
            {
                return "Invalid Employee";
            }
        }


        public JsonResult GetDesignations()
        {
            JsonResult result = null;
            using (TestDatabaseEntities3 context = new TestDatabaseEntities3())
            {
                var desg = context.Designations.ToList();
                result = Json(desg, JsonRequestBehavior.AllowGet);
            }
            return result;
        }


        public JsonResult GetDepartments()
        {
            JsonResult result = null;
            using (TestDatabaseEntities3 data = new TestDatabaseEntities3())
            {
                var deps = data.Departments.ToList();
                result = Json(deps, JsonRequestBehavior.AllowGet);
            }
            return result;
        }
    }
}