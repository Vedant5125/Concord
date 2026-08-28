import { prisma } from "../db.js";

const contractList = async (req: any, res: any) => {
  const { Pname, Cname } = req.query;

  const checker: any = {
    producer: { organizationId: req.organization.id },
    consumer: { organizationId: req.organization.id }
  };

  if (Pname && Pname.trim() !== "") {
    checker.producer.name = Pname;
  }
  if (Cname && Cname.trim() !== "") {
    checker.consumer.name = Cname;
  }

  try {
    const list = await prisma.contract.findMany({
      where: {
        ...checker
      },
      include: {
        interactions: true,
        producer: true,
        consumer: true
      }
    });

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({message:"Error fetching contract list"});
  }
};

export default contractList;
