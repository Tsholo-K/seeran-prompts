import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request) => {

    try {

        await connectToDB();
        console.log('connected to the database')

        console.log('fetching all prompts...')
        const prompts = await Prompt.find({}).populate('creator');

        console.log('returning all prompts...')
        return new Response(JSON.stringify(prompts), { status : 200 });

    } catch (error) {

        return new Response( 'Failed to fetch propmts from database' , { status : 500 });

    };

};