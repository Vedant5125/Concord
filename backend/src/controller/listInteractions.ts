import {prisma} from "../db.js"

const interactionList = async (req:any , res:any) =>{
    const {data} = req.query;
    const interaction_id = Number(data)
    if(!data || isNaN(interaction_id)){
        return res.status(400).json({message:"Valid id required for interaction"})
    }

    try {
        const list = await prisma.interaction.findUnique({
            where:{id:interaction_id}
        })
        if (!list) {
            return res.status(404).json({ error: "Interaction not found" });
        
        }
        res.status(200).json(list)
    } catch (error) {
        console.log(error);
        
        res.status(500).json("Error fetching interaction list")
    }
}

export default interactionList