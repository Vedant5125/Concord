import {prisma} from "../db.js";

const contractList = async (req:any, res:any) =>{
    const {Pname,Cname} = req.query;

    const checker:any = {}
    if(Pname && Pname.trim()!=""){ checker.producer = {name:Pname}}
    if(Cname && Cname.trim()!=""){ checker.consumer = {name:Cname}}

    if(Object.keys(checker).length == 0){
        return res.status(400).json({message: "Provide at least one of Provider name or Consumer name"})
    }

    try {
        const list = await prisma.contract.findMany({
            where:{
                ...checker
            },
            include:{
                interactions:true
            }
        })

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json("Error fetching contract list");
    }
    
}

export default contractList;