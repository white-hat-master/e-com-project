const db = require('./connection');

function userModel()
{
    this.addProduct=(pDetails,f1_name,f2_name,f3_name)=>{
               return new Promise((resolve,reject)=>{
                db.collection('product').find().toArray((err,result)=>{
                    var pid
                    if(result.length>0)
                    {
                        pid = result[0].pid
                        for(let i=1; i<result.length; i++)
                        {
                            if (pid<result[i].pid)
                                pid = result[i].pid
                        }
                    }
                    else
                        pid = 0;
                    pDetailes = {'pid':pid+1,'title':pDetails.title,'cat':pDetails.cat,
                    'subcat':pDetails.subcat,
                    'city':pDetails.city,
                    'des':pDetails.des,
                    'f1_name':f1_name,
                    'f2_name':f2_name,
                    'f3_name':f3_name,
                    'price':pDetails.price,
                    'dt':Date()}
                    db.collection('product').insertOne(pDetailes,(err,result1)=>{
                        err ? reject(err) : resolve(result1);
                    })
    
                    
                })     
               })
           }

   this.orderlist=(uid)=>{
       return new Promise((resolve,reject)=>{
            db.collection('payment').find({'uid':uid}).toArray((err,result)=>{
                err ? reject(err) : resolve(result);
            })
        })
    }


//    this.orderlist=(uid)=>{
//        return new Promise((resolve,reject)=>{
//             pool.getConnection((err,con)=>{
//                 sqlQuery='select * from payment where uid=?'
//                 sqlData=[uid]
//                 con.query(sqlQuery,sqlData,(err,result)=>{
//                 con.release();
//                 err ? reject(err) : resolve(result)
//               })
//            })
//         })
//     }
}

module.exports = new userModel()