import { prisma } from "../db.js";

const publishContract = async(req:any,res:any):Promise<void> =>{
    const {Pname, Cname,Interactions} = req.body;
    if(
        [Pname, Cname].some((fields)=>fields.trim() ==="")
    ){
        res.status(400).json({ error: "Producer and Consumer names are required" });
        return;
    }

    if(!Array.isArray(Interactions)){
        res.status(400).json({ error: "Interactions must be an array" });
        return;
    }

    try {

        const P_info = await prisma.producer.upsert({
            where:{name : Pname},
            update:{},
            create:{name: Pname}
            
        })
        const C_info = await prisma.consumer.upsert({
            where:{name : Cname},
            update:{},
            create:{name: Cname}
            
        })

        const contractInfo = await prisma.contract.create({
            data:{
                producerId: P_info?.id,
                consumerId: C_info?.id
            }
        })

        // Interactions.forEach(async (e : any) =>   forEach actually dont work with async-await , it dont wait , it wont show error while writing code but it wont wait 
        for(const e of Interactions){
            const reqBlock = e.request
            const resBlock = e.response
            await prisma.interaction.create({
                data :{
                    contractId : contractInfo?.id,
                    path : reqBlock.path,
                    pathParams : reqBlock.pathParams,
                    method : reqBlock.method,
                    requestBody : reqBlock.body,
                    statusCode : resBlock.status,
                    responseBody : resBlock.body
                }
            })
        };
        res.status(200).json({message:`Contract ${contractInfo?.id} published successfully`})
        
    } catch (error) {
        res.status(500).json({ error: "Failed to publish contract"})
    }

}

export default publishContract