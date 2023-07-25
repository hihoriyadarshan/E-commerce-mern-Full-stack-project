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

    // console.log(querycopy);
     this.query = this.query.find(querycopy)
     return this;
    }
}


module.exports = ApiFeatures