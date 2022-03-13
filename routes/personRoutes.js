const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {
    const { name, email, contact } = req.body


    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatorio' })
        return
    }

    const person = {
        name,
        email,
        contact,
    }

    try {
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


//Leitura de dados

router.get('/', async (req, res) => {
    try {

        const people = await Person.find()

        res.status(200).json(people)


    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'Usuario Não Encontrado' })
            return
        }


        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


// update - atualização de dados(put, patch)

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, email, contact } = req.body

    const person = {
        name,
        email,
        contact,
    }

    try {

        const updatePerson = await Person.updateOne({ _id: id }, person)


        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuario Não Encontrado' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//delete


router.delete('/:id', async (req, res) => {


    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Usuario Não Encontrado' })
        return
    }

    try {

        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'deletado' })


    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


module.exports = router