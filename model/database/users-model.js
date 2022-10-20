// Imports ---------------------------------------
import dbConn from '../database/database.js';

// Model -----------------------------------------
const dbStructure = {};
dbStructure.table = 'Users';
dbStructure.idField = 'UserID';
dbStructure.mutableFields = ['UserFirstname', 'UserLastname', 'UserEmail', 'UserPassword', 'UserRegistered', 'UserYearID', 'UserUsertypeID', 'UserLevel', 'UserImageURL'];
dbStructure.fields = [dbStructure.idField, ...dbStructure.mutableFields];
dbStructure.extendedTable = `((${dbStructure.table} LEFT JOIN Years ON Users.UserYearID=Years.YearID) LEFT JOIN Usertypes ON Users.UserUsertypeID=Usertypes.UsertypeID)`;
dbStructure.extendedFields = `${dbStructure.fields}, Years.YearName AS UserYearName, Usertypes.UsertypeName AS UserUsertypeName`;

// Conformance -----------------------------------
const dbConformance = {};
dbConformance.recordToObj = record => { return { ...record, UserRegistered: record.UserRegistered ? true : false }; };
dbConformance.objToRecord = obj => dbStructure.mutableFields.reduce((prevRecord, currField) => {
    if(Object.keys(obj).includes(currField)) prevRecord[currField] = obj[currField];
    return prevRecord;
},{});

export default { dbConn, dbStructure, dbConformance };