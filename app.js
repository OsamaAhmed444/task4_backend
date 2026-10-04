
const { MongoClient, ObjectId } = require("mongodb")
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const dbName = "task-4"

async function addUsers() {
    try {
        await client.connect()
        console.log("Connected To DB sucessfully")
        const db = client.db(dbName)
        const users = db.collection("users")
        const result1 = await users.insertOne(
            {
                name: "Ahmed Ali",
                age: 24,
                city: "Cairo"
            }
        )
        const result2 = await users.insertOne(
            {
                name: "Sarah Hassan",
                age: 22,
                city: "Giza"
            }
        )
        console.log("Inserted Docs ID-1 : ", result1.insertedId)
        console.log("Inserted Docs ID-2 : ", result2.insertedId)
        await addManyUsers(users)
        await findUsers(users)
        await limitFindUsers(users)
        await findUser(users, "6aa94bb3ee527546920f96ce")
        await countDocs(users)
        await updateUser(users,"6aa94bb3ee527546920f96ce")
        await updateManyUsers(users)
        await deletUser(users,"6aa94bb3ee527546920f96ce")
        await deleteManyUsers(users)
    }
    catch (error) {
        console.log(error)
    }
}

addUsers()

async function addManyUsers(users) {
    const results = await users.insertMany([
        {
            name: "Omar Ibrahim",
            age: 27,
            city: "Alex"
        },
        {
            name: "Menna Said",
            age: 21,
            city: "Sohag"
        },
        {
            name: "Youssef Mahmoud",
            age: 27,
            city: "Assuit"
        },
        {
            name: "Nourhan Ali",
            age: 23,
            city: "Mansoura"
        },
        {
            name: "Mohamed Ahmed",
            age: 27,
            city: "Luxor"
        },
        {
            name: "Aya Mustafa",
            age: 20,
            city: "Qena"
        },
        {
            name: "Karim Samy",
            age: 26,
            city: "Tanta"
        },
        {
            name: "Salma Hassan",
            age: 27,
            city: "Port Said"
        },
        {
            name: "Mahmoud Yasser",
            age: 31,
            city: "Ismailia"
        },
        {
            name: "Habiba Ashraf",
            age: 27,
            city: "Aswan"
        },
    ])
    console.log("Number Of Inserted Docs : ", results.insertedCount)
}

async function findUsers(users) {
    const results = await users.find({ age: 27 }).toArray()
    console.log("All Docs Are Matching in Age : ", results)
}

async function limitFindUsers(users) {
    const results = await users.find({ age: 27 }).limit(3).toArray()
    console.log("Limited Users Are Matching in Age : ", results)
}

async function findUser(users, id) {
    const user = await users.findOne({
        _id: new ObjectId(id)
    })
    if (user) {
        console.log("Found User : ", user.insertedId, user)
    }
    else {
        console.log("Not Found User")
    }
}

async function countDocs(users) {
    const count = await users.countDocuments({ age: 27 })
    console.log("Users With The Same Age : ", count)
}

async function updateUser(users, id) {
    const result = await users.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: { name: "Saad AbdElbased" },
            $inc: { age: 5 }
        })
    console.log("Number Of Modified Docs : ", result.modifiedCount)
}

async function updateManyUsers(users) {
    const results = await users.updateMany(
        {},
        { $inc: { age: 5 } }
    )
    console.log("Number Of Modified Docs : ", results.modifiedCount)
}

async function deletUser(users, id) {
    const user = await users.deleteOne(
        { _id: new ObjectId(id) }
    )
    console.log("Number Of Deleted Docs : ", user.deletedCount)
}

async function deleteManyUsers(users) {
    const results = await users.deleteMany(
        { age: 27 }
    )
    console.log("Number OF Deleted Docs : ", results.deletedCount)
}