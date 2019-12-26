const db = require('./connection');

function indexModel() {
    this.register = (userDetails) => {
        return new Promise((reslove, reject) => {
            db.collection('register').find().toArray((err, result) => {
                var regid
                if (result.length > 0) {
                    regid = result[0].regid
                    for (let i = 1; i < result.length; i++) {
                        if (regid < result[i].regid) {
                            regid = result[i].regid
                        }
                    }
                }
                else
                    regid = 0;
                userDetails.regid = regid + 1
                userDetails.role = 'user'
                userDetails.status = 0
                userDetails.dt = Date()

                db.collection('register').insertOne(userDetails, (err, result1) => {
                    err ? reject(err) : reslove(result1)
                })

            })
        })
    }

    this.fetchProduct = (urlObj) => {
        return new Promise((resolve, reject) => {
            db.collection('product').find({'subcat':urlObj.scnm}).toArray((err,result)=>{
                err ? reject(err): resolve(result);
            })
        })
    }

    // this.fetchProduct = (urlObj) => {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err, con) => {
    //             if (urlObj.sprice != undefined) {
    //                 var sqlQuery = "select * from product where subcat=? and price between ? and ?"
    //                 var sqlData = [urlObj.scnm, urlObj.sprice, urlObj.eprice]
    //             }
    //             else if (urlObj.city != undefined) {
    //                 var sqlQuery = "select * from product inner join register on product.pid=register.email where subcat=? and city=?"
    //                 var sqlData = [urlObj.scnm, urlObj.city]
    //             }
    //             else {
    //                 var sqlQuery = "select * from product where subcat=?"
    //                 var sqlData = [urlObj.scnm]
    //             }
    //             con.query(sqlQuery, sqlData, (err, result) => {
    //                 con.release()
    //                 err ? reject(err) : resolve(result);
    //             })
    //         })
    //     })
    // }

    this.login = (userDetails) => {
        return new Promise((resolve, reject) => {
            db.collection('register').find({ 'email': userDetails.email, 'password': userDetails.password, 'status': 1 }).toArray((err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }


    this.contact = (userDetails) => {
        return new Promise((resolve, reject) => {
           db.collection('msg').insertOne(userDetails,(err,result)=>{
               console.log(userDetails);
               
               err ? reject(err) : resolve(result);
           })
        })
    }


    this.verify = (emailID) => {
            return new Promise((resolve, reject) => {
                db.collection('register').update({'email':emailID},{$set:{'status':1}},(err,result)=>{
                    err ? reject(err) : resolve(result);
                })
            })
        }

        
    this.fetchall = (c_nm) => {
        return new Promise((resolve, reject) => {
            db.collection(c_nm).find().toArray((err,result)=>{
                err ? reject(err) : resolve(result);
            })
        })
    }

    // this.fetchall = (c_nm) => {
    //     return new Promise((resolve, reject) => {
    //         db.collection(c_nm).find().toArray((err,result)=>{
    //             err ? reject(err) : resolve(result);
    //         })
    //     })
    // }

    this.fetchsubcat = (cnm) => {
        return new Promise((resolve, reject) => {
            db.collection('addsubcat').find({'catnm':cnm}).toArray((err,result)=>{
                err ? reject(err) : resolve(result);
            })
        })
    }

    this.payment = (pDetails) => {
        return new Promise((resolve, reject) => {
            db.collection('payment').insert(pDetails,(err,result)=>{
                err ? reject(err):resolve(result);
            })
        })
    }

    
}

module.exports = new indexModel()