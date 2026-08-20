import { prisma } from "../db.js"

const authMiddleWare = async (req: any, res: any, next: any) => {
    const userKey = req.headers['user-key'];

    if(!userKey){
        res.status(400).json({message: "Api key is required"})
        return;
    }

    try {
        const findOrg = await prisma.organization.findUnique({
            where:{
                apiKey: userKey as string
            }
        })

        if(!findOrg){
            res.status(400).json({message:"Invalid api key"})
            return;
        }

        req.Org = findOrg;
        next();
        
    } catch (error) {
        res.status(500).json({message:"Unable to authorize request"})
    }
}

export default authMiddleWare;