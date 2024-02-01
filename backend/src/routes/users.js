const express = require('express')
const router = express.Router()
const db = require('../database')
const { Op } = require('sequelize')
const { httpsGetData, httpsPostData, parseJson } = require('../utilites')

router.get('/get-user-for-fight/', async (req, res, next) => {
    try {
        const user_id = parseInt(req.query.id)

        const params = { where: {} }

        if (!isNaN(user_id)) params.where.id = { [Op.ne]: user_id }

        // get random user
        const all_users = JSON.parse(JSON.stringify(await db.Person.findAll(params))) //httpsGetData('/users/')
        const random_user = all_users[Math.floor(Math.random() * all_users.length)]

        // check user online or offline
        // double parse for very empty objects
        const wsUser = parseJson(await httpsGetData(`/users/${random_user.id}`))
        const isOnline = typeof wsUser === 'object' && !!Object.keys(wsUser).length

        res.status(200).send(
            JSON.stringify({
                id: random_user.id,
                username: random_user.username,
                isOnline
            })
        )
    } catch (e) {
        console.log(e)
        res.status(500).send(JSON.stringify(e))
    }
})

router.post('/grab-money/', async (req, res, next) => {
    try {
        const from = parseJson(req.body.from)
        const to = parseJson(req.body.to)

        if(from && to) {
            const fromUser = await db.Person.findOne({where: {id: from}})
            const toUser = await db.Person.findOne({where: {id: to}})
            const sum = Math.floor(fromUser.coins * 5 / 100)
            fromUser.coins -= sum
            toUser.coins += sum
            await fromUser.save()
            await toUser.save()

            const wsUser = parseJson(await httpsGetData(`/users/${fromUser.id}`))
            const isOnline = typeof wsUser === 'object' && !!Object.keys(wsUser).length
            if(isOnline)
                await httpsPostData('/users/send-set-money/', {
                    id: fromUser.id,
                    coins: sum
                })

            await httpsPostData('/users/send-set-money/', {
                id: toUser.id,
                coins: -sum
            })


            res.status(200).send(JSON.stringify({status: 'ok', coins: sum}))
        } else {
            throw new Error('incorrect data')
        }

    } catch (e) {
        console.log(e)
        res.status(500).send(JSON.stringify(e))
    }
})

router.get('/', function (req, res) {
    const params = {
        limit: req.query.limit,
        order: [['coins', 'DESC']]
    }

    if (req.query.username) {
        params.where = {
            username: req.query.username
        }
    }

    db.Person.findAll(params)
        .then((persons) => {
            res.status(200).send(JSON.stringify(persons))
        })
        .catch((err) => {
            res.status(500).send(JSON.stringify(err))
        })
})

router.get('/:id', function (req, res) {
    db.Person.findByPk(req.params.id)
        .then((person) => {
            res.status(200).send(JSON.stringify(person))
        })
        .catch((err) => {
            res.status(500).send(JSON.stringify(err))
        })
})

router.post('/', function (req, res) {
    db.Person.create({
        username: req.body.username,
        userid: req.body.userid,
        first_name: req.body.first_name,
        coins: req.body.coins
    })
        .then((person) => {
            res.status(200).send(JSON.stringify(person))
        })
        .catch((err) => {
            res.status(500).send(JSON.stringify(err))
        })
})

router.patch('/:id', function (req, res) {
    const data = {}
    const keys = ['username', 'userid', 'coins', 'first_name']
    for (const k of keys) if (req.body[k]) data[k] = req.body[k]

    db.Person.findByPk(req.params.id)
        .then((person) => {
            person.update(data)
            res.status(200).send(JSON.stringify(person))
        })
        .catch((err) => {
            res.status(500).send(JSON.stringify(err))
        })
})

router.delete('/:id', function (req, res) {
    db.Person.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).send()
        })
        .catch((err) => {
            res.status(500).send(JSON.stringify(err))
        })
})

module.exports = router
