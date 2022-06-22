const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', async (req, res) => {
    try {
        const getData = await User.findAll({
            attributes: { exclude: ['password'] },
        })
        res.json(getData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
    try {
        const getData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_text', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        })
        if (!getData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(getData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const postData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = postData.id;
            req.session.logged_in = true;

            res.status(200).json(postData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const postData = await User.findOne({ where: { email: req.body.email } });

        if (!postData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await postData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = postData.id;
            req.session.logged_in = true;

            res.json({ user: postData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put('/:id', withAuth, async (req, res) => {
    try {
        const putData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        if (!putData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(putData);
    } catch (err) {
    res.status(500).json(err);
}
});

// DELETE /api/users/1
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteData = awaitUser.destroy({
        where: {
            id: req.params.id
        }
    })
            if (!deleteData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(deleteData);
        } catch (err) {
        res.status(500).json(err);
    }
    });

module.exports = router;