const db = require('./connection');

function adminModel() {

    this.addcat = (catnm,caticonnm)=>{
        return new Promise((resolve,reject)=>{
            db.collection('addcat').find().toArray((err,result)=>{
                var catid
                if(result.length>0)
                {
                    catid = result[0].catid
                    for(let i=1; i<result.length; i++)
                    {
                        if (catid<result[i].catid)
                            catid = result[i].catid
                    }
                }
                else
                    catid = 0;
                catDetailes = {'catid':catid+1,'catnm':catnm,'caticonnm':caticonnm}
                db.collection('addcat').insertOne(catDetailes,(err,result1)=>{
                    err ? reject(err) : resolve(result1);
                })

                
            })
        })
    }

    this.addsubcat = (catnm,subcatnm,subcaticonnm)=>{
        return new Promise((resolve,reject)=>{
            db.collection('addsubcat').find().toArray((err,result)=>{
                var subcatid
                if(result.length>0)
                {
                    subcatid = result[0].subcatid
                    for(let i=1; i<result.length; i++)
                    {
                        if (subcatid<result[i].subcatid)
                            subcatid = result[i].subcatid
                    }
                }
                else
                    subcatid = 0;
                subcatDetailes = {'subcatid':subcatid+1,'catnm':catnm,'subcatnm':subcatnm,'subcaticonnm':subcaticonnm}
                db.collection('addsubcat').insertOne(subcatDetailes,(err,result1)=>{
                    err ? reject(err) : resolve(result1);
                })

                
            })
        })
    }

    this.viewUser = () => {
        return new Promise((resolve, reject) => {
            db.collection('register').find({ 'role': 'user' }).toArray((err, result) => {
                err ? reject(err) : resolve(result);
            })
        })
    }

    this.manageUserStatus = (details) => {
        return new Promise((resolve, reject) => {
            if (details.s == 'block') {
                db.collection('register').update({ 'regid': parseInt(details.regid) }, { $set: { 'status': 0 } }, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else if (details.s == 'unblock') {
                db.collection('register').update({ 'regid': parseInt(details.regid) }, { $set: { 'status': 1 } }, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {
                db.collection('register').remove({ 'regid': parseInt(details.regid) }, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
        })
    }

}

module.exports = new adminModel()