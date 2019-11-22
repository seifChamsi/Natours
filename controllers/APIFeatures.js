class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sort() {
    //2)Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
  filter() {
    const queryObj = {
      ...this.queryString
    };
    const exludedFields = ['page', 'sort', 'limit', 'fields'];
    //exclude the fields
    exludedFields.forEach(el => delete queryObj[el]);
    //2)Adavanced filtering
    let queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  limitFields() {
    // 3) field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      console.log(fields);
      this.query = this.query.select(fields);
    } else {
      //exclude __v
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    //4 ) pagination page limiti skip
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;