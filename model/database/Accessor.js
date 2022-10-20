class Accessor {
    constructor(model) {
        this.dbConn = model.dbConn;
        this.dbStructure = model.dbStructure;
        this.dbConformance = model.dbConformance;
    }

    // Helper ---------------------------------------

    buildSetTemplate = record => {
        const arrayOfKeys = Object.keys(record);
        return arrayOfKeys.reduce((prev, curr, index) => prev + `${curr}=:${curr}` + (index === (arrayOfKeys.length-1) ? ' ' : ', '), 'SET ');
    };

    // Methods ---------------------------------------
    // Create record
    create = async obj => {
        const record = this.dbConformance.objToRecord(obj);
        const sql = `INSERT INTO ${this.dbStructure.table} ${this.buildSetTemplate(record)}`;
        try {
            const [status] = await this.dbConn.query(sql, record);
            if(status.affectedRows === 0) return { isSuccess: false, result: null, message: 'Failed to recover inserted record: no rows affected' };
            const { isSuccess, result, message } = await this.read(status.insertId);
            return isSuccess 
                ? { isSuccess: true, result: this.dbConformance.recordToObj(result), message: 'Record successfully inserted' }
                : { isSuccess: false, result: null, message: `Failed to recover inserted record: ${message}` };
        } catch(error) {
            return { isSuccess: false, result: null, message: `Failed to insert record: ${error}` };
        }
    }
    
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
    update = async (id, obj) => {
        const record = this.dbConformance.objToRecord(obj);
        const sql = `UPDATE ${this.dbStructure.table} ${this.buildSetTemplate(record)} WHERE ${this.dbStructure.idField}=${id}`;
        try {
            const [status] = await this.dbConn.query(sql, record);
            if(status.affectedRows === 0) return { isSuccess: false, result: null, message: 'Failed to update record: no rows affected' };
            const { isSuccess, result, message } = await this.read(id);
            return isSuccess 
                ? { isSuccess: true, result: this.dbConformance.recordToObj(result), message: 'Record successfully updated' }
                : { isSuccess: false, result: null, message: `Failed to recover updated record: ${message}` };
        } catch(error) {
            return { isSuccess: false, result: null, message: `Failed to update record: ${error.message}` };
        }
    } 

    // Delete specific record
    delete = async id => {
        const sql = `DELETE FROM ${this.dbStructure.table} WHERE ${this.dbStructure.idField}=${id}`;
        try {
            const [status] = await this.dbConn.query(sql);
            return status.affectedRows === 0
                ? { isSuccess: false, result: null, message: `Record ${id} not deleted` }
                : { isSuccess: true, result: null, message: `Record ${id} deleted` };
        } catch(error) {
            return { isSuccess: false, result: null, message: `Failed to delete record: ${error.message}` };
        }
    }

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