import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
    if(req.method !== 'DELETE') return res.status(405).end();

    const auth = await authorization(req, res);

    const { id } = req.query;

    const deleteRow = await db('posts').where({ id }).del();

    res.status(200);
    res.json({
        message: 'Post deleted successfully'
    });
}
