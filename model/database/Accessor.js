class Accessor {
    constructor(model) {
        this.dbConn = model.dbConn;
        this.dbStructure = model.dbStructure;
        this.dbConformance = model.dbConformance;
    }

    // Methods ---------------------------------------
    /*
    // Create record
    create = obj => {

        record = objToRecord(obj);

        sql = 'INSERT INTO table SET field1=:ModuleName field2=:ModuleCode', '
        sql = 'INSERT INTO table ' + buildSetTemplate(record)'

        status = dbConn.query(sql, record)

        record = read(status.insertId)

        obj = recordToObj(record)
        
        return { isSuccess: true, result: obj, message: 'Record successfully inserted' };
    } */
    
    // Read specific record
    read = async id => {
        const sql = `SELECT ${this.dbStructure.extendedFields} FROM ${this.dbStructure.extendedTable} WHERE ${this.dbStructure.idField}=${id}`;
        try {
            const [result] = await this.dbConn.query(sql);
            return result.length === 0
                ? { isSuccess: false, result: null, message: 'No record found' }
                : { isSuccess: true, result: this.dbConformance.recordToObj(result[0]), message: 'Record successfully recovered' };
        } catch(error) {
            return { isSuccess: false, result: null, message: `Failed to recover record: ${error.message}` };
        }
    }

    // Update specific record
    /*
    update = (id, obj) => {

        if (!record) return { isSuccess: false, result: null, message: `Record ${id} not found` };
        this.mutableKeys.map((key) => record[key] = obj[key] || record[key]);
        return { isSuccess: true, result: record, message: 'Record successfully updated' };
    }   

    // Delete specific record
    delete = id => {
        
        if (index < 0) return { isSuccess: false, result: null, message: `Record ${id} not found` };
        this.records.splice(index, 1);
        return { isSuccess: true, result: null, message: 'Record successfully deleted' };
    }
    */
    // List all users
    list = async () => {
        const sql = `SELECT ${this.dbStructure.extendedFields} FROM ${this.dbStructure.extendedTable}`;
        try {
            const [result] = await this.dbConn.query(sql);
            return result.length === 0
                ? { isSuccess: false, result: null, message: 'No records found' }
                : { isSuccess: true, result: result.map(this.dbConformance.recordToObj), message: 'Records successfully recovered' };
        } catch(error) {
            return { isSuccess: false, result: null, message: `Failed to recover records: ${error.message}` };
        }
    } 
}

export default Accessor;