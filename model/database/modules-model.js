// Imports ---------------------------------------
import dbConn from '../database/database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Modules';
dbStructure.idField = 'ModuleID';
dbStructure.mutableFields = ['ModuleName', 'ModuleCode', 'ModuleLevel', 'ModuleYearID', 'ModuleLeaderID', 'ModuleImageURL'];
dbStructure.fields = [dbStructure.idField, ...dbStructure.mutableFields];
dbStructure.extendedTable = `((${dbStructure.table} INNER JOIN Years ON Modules.ModuleYearID=Years.YearID) INNER JOIN Users ON Modules.ModuleLeaderID=Users.UserID)`;
dbStructure.extendedFields = `${dbStructure.fields}, Years.YearName AS ModuleYearName, CONCAT(Users.UserFirstname, ' ', Users.UserLastname) AS ModuleLeaderName`;

// Conformance -----------------------------------
const dbConformance = {};
dbConformance.recordToObj = record => record;
dbConformance.objToRecord = object => object;

export default { dbConn, dbStructure, dbConformance };