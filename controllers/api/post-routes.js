const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', async (req, res) => {
    try {
        const getData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'created_at',
                'post_text'
            ],
            order: [['created_at', 'ASC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        })
        res.json(getData)
    } catch (err) {
        res.status(500).json(err);
    }
});

//get User by ID
router.get('/:id', async (req, res) => {
    try {
        const getData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_text'
            ],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        if (!getData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(getData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        })
        res.json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const putData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content
        },
            {
                where: {
                    id: req.params.id
                }
            })
        if (!putData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(putData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteData = await Post.destroy({
        where: {
            id: req.params.id
        }
    })
            if (!deleteData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(deleteData);
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router;