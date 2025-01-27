import config from "../../../config/config";

export default async function(req,res){
    const {cityName} = req.query;
    try{
         const response = await fetch(`${config.API_URL}/economy/city/${cityName}`)
         const data = await response.json()
         console.log('data',data);
         
         if (!response.ok){
            return res.status(response.status).json(data)
         }
         return res.status(200).json(data)

    }catch(error){
        console.error('error in api',error)
        res.status(500).json({error:"internal server error"})

    }
}