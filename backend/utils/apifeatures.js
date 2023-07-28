// search
class ApiFeatures{
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr
    }
    search(){
        const keyword = this.querystr.keyword ?{
            name:{
                $regex:this.querystr.keyword, //regex regular expression
                $options:"i", //case sensitive
            },
        }
        :{};

        console.log(keyword);

        this.query = this.query.find({...keyword})
        return this;
    }

    // search filter
    filter(){
        const querycopy = {...this.querystr}
        console.log(querycopy)
        // removing some fields for category
    const removeFiels = ["keyword","page","limit"];

    removeFiels.forEach(key=> delete querycopy[key]);

        // Filter for Price Rating(Range)
    
    console.log(querycopy)
    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`); //This is a regular expression



     this.query = this.query.find(JSON.parse(querystr));
     console.log(querystr);
     return this;
    }
 pagination(resultperpage){
        const currentPage = Number(this.querystr.page)  || 1;  //50 -10

        const skip = resultperpage * (currentPage - 1);

        this.query =this.query.limit(resultperpage).skip((skip))

        return this;
 }
}


module.exports = ApiFeatures