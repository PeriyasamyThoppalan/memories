import jwt from 'jsonwebtoken';

const secret='test';

//Flow say user likes a post, 1. auth the user using middleware component 2. call the likepost component
const auth = async(req,res,next) => {
    console.log('Middleware : auth');
    try {
        const token=req.headers.authorization.split(" ")[1];

        const isCustomAuth=token.length <500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData=jwt.verify(token,secret);

            req.userId=decodedData?.id;
            console.log('Middleware : auth:custom token');
            console.log(req);
        }else{
            decodedData=jwt.decode(token);

            req.userId=decodedData?.sub;
            console.log('Middleware : auth:not custom token');
            console.log(req);
        }
     next();   
    } catch (error) {
        console.log(error);
    }

}

export default auth;