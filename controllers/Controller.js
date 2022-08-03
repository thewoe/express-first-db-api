export class Controller {
    constructor(model, schema, records) {
        this.idKey = model.idKey;
        this.mutableKeys = model.mutableKeys;
        this.idSchema = schema.idSchema;
        this.createSchema = schema.createSchema;
        this.updateSchema = schema.updateSchema;
        this.records = records;
    }
    // Methods ---------------------------------------
    reportErrors = error => error.details.map((detail) => detail.message);

    // Create record
    post = (req, res) => {
        // Validate request
        const { error } = this.createSchema.validate(req.body, {abortEarly: false});
        if (error) return res.status(400).json({ Message: this.reportErrors(error) });
        // Access data model
        const record = { ...req.body, [this.idKey]: this.records.reduce((max,curr) => curr[this.idKey] > max[this.idKey] ? curr : max)[this.idKey] + 1 };
        this.records.push(record);
        // Response to request
        res.json(record);
    };

    // Read specific record
    get = (req, res) => {
        // Validate request
        const { error } = this.idSchema.validate(req.params.id);
        if (error) return res.status(400).json({ Message: this.reportErrors(error) });
        // Access data model
        const record = this.records.find((record) => record[this.idKey] === parseInt(req.params.id));
        if (!record) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
        // Response to request
        res.json(record);
    };

    // Update specific record
    put = (req, res) => {
        // Validate request
        const { error } = this.updateSchema.validate({id: req.params.id, obj: req.body}, {abortEarly: false});
        if (error) return res.status(400).json({ Message: this.reportErrors(error) });
        // Access data model
        const record = this.records.find((record) => record[this.idKey] === parseInt(req.params.id));
        if (!record) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
        this.mutableKeys.map((key) => record[key] = req.body[key] || record[key]);
        // Response to request
        res.json(record);
    };

    // Delete specific record
    delete = (req, res) => {
        // Validate request
        const { error } = this.idSchema.validate(req.params.id);
        if (error) return res.status(400).json({ Message: this.reportErrors(error) });
        // Access data model
        const index = this.records.findIndex((record) => record[this.idKey] === parseInt(req.params.id));
        if (index < 0) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
        this.records.splice(index, 1);
        // Response to request
        res.json({ Message: `Record ${req.params.id} deleted`});
    };

    // List all modules
    list = (req, res) => {
        // Validate request
        // Access data model
        // Response to request
        res.json(this.records);
    };
}

export default Controller;