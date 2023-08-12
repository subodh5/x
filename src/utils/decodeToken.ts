import jwt from "jsonwebtoken";
export function decodeToken(token:string){
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as {
        id: string;
        username: string;
      };
      return decoded;
    
}