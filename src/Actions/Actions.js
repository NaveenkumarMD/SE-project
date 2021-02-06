import {GETCLUBS, LOGIN,SIGNUP} from './Types'
import firebase from 'firebase'
export const getclubs=()=>async dispatch=>{
    firebase.firestore().collection('clubs').get().then(query=>{
        var array=[]
        query.forEach(doc=>{
          array.push({
            name:doc.id,
            fullname:doc.data().name,
            logo:doc.data().logo,
            datum:doc.data()
          })
        })
        localStorage.setItem("clubs",JSON.stringify(array))
        dispatch({
            type:GETCLUBS,
            payload:array
        })
 
      })
}
export const postingadminlogindata=(postdata)=>(dispatch)=>{
    
    firebase.auth().signInWithEmailAndPassword(postdata.mail,postdata.password).then((usercredential)=>{
        console.log("mail verifivation",usercredential.user.emailVerified)
        firebase.firestore().collection("admins").doc(usercredential.user.uid).onSnapshot(res=>{
            console.log(res.data())
            localStorage.setItem("user",JSON.stringify(res.data()))
            dispatch({
                type:LOGIN,
                payload:res.data()
            })
        })
        

    }).catch(err=>{
        return dispatch({
            type:LOGIN,
            payload:err
        })
    })
}
export const postinglogindata=(postdata)=>(dispatch)=>{
    
    firebase.auth().signInWithEmailAndPassword(postdata.mail,postdata.password).then((usercredential)=>{
        console.log("mail verifivation",usercredential.user.emailVerified)
        firebase.firestore().collection("users").doc(usercredential.user.uid).onSnapshot(res=>{
            console.log(res.data())
            localStorage.setItem("user",JSON.stringify(res.data()))
            dispatch({
                type:LOGIN,
                payload:res.data()
            })
        })
        

    }).catch(err=>{
        return dispatch({
            type:LOGIN,
            payload:err
        })
    })
}
export const postingsignupdata=postdata=>async dispatch=>{
  
    await firebase.auth().createUserWithEmailAndPassword(postdata.mail,postdata.password).then(async data=>{
        const user=firebase.auth().currentUser

        await firebase.firestore().collection('users').doc(user.uid).set({
            name:postdata.name,
            mobile:postdata.mobile,
            year:postdata.year,
            mail:postdata.mail,
            department:postdata.mail.substring(7,10),
            regno:postdata.mail.substring(0,7),
        }).then(res=>{
            console.log(res.data())
            dispatch({
                type:SIGNUP,
                payload:res.data()
            })
            localStorage.setItem("user",res.data())
        })
        
        

    
    }).catch(err=>{
        return dispatch({
            type:SIGNUP,
            payload:err
        })
    })

    
}