import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/:userId
export const GET = async (request, {params}) => {
  try {
    await connectDB();
    //the name of the folder is the param
    const userId = params.userId;

    if (!userId) {
      return new Response('User id is requierd ', {status: 400});
    }

    const properties = await Property.find({owner: userId});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response('something went wrong', error, {status: 500});
  }
};
