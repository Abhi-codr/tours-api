class APIFeatures {
    constructor(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj;
    }

    filter() {
        const filterObj = { ...this.queryObj };
        const excludedFields = ["page", "sort", "limit", "fields", "_id"];
        excludedFields.map((excField) => delete filterObj[excField]);
        //Checking if filter has value
        Object.keys(filterObj).map((filterKey) =>
            !filterObj[filterKey] ? delete filterObj[filterKey] : ""
        );
        this.query.find(filterObj)
        return this
    }

    sort() {
        if (this.queryObj.sort && this.queryObj.sort.trim()) {
            const sortStr = this.queryObj.sort.trim().replace(",", " ");
            this.query.sort(sortStr);
        }
        return this
    }

    limitFields() {
        if (this.queryObj.fields && this.queryObj.fields.trim()) {
            const fieldStr = this.queryObj.fields.trim().replace(",", " ");
            this.query.select(fieldStr);
        }
        return this
    }

    paginate() {
        const page = this.queryObj.page || 1;
        const limit = this.queryObj.limit || 50;
        const skip = (page - 1) * limit;

        this.query.skip(skip).limit(limit);

        return this
    }
}

module.exports = APIFeatures