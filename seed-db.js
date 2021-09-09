const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {

    const uri = 'mongodb://localhost:27017/blogapi';
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    try {
        const postsCollection = await client.db("blogapi").collection("Post");
        const commentsCollection = await client.db("blogapi").collection("Comment");
        // The drop() command destroys all data from a collection.
        postsCollection.drop();
        commentsCollection.drop();
        // make a bunch of data
        for (let i = 0; i < 100; i++) {
            const post = {
                "tags": [faker.commerce.color(), faker.commerce.color(), faker.commerce.color()],
                "title": faker.company.companyName(),
                "content": faker.commerce.productDescription(),
                "status": randomIntFromInterval(1, 3),
                "author_id": faker.address.zipCode(),
            }
            await postsCollection.insertOne(post);
            for (let j = 0; j < 10; j++) {
                const comment = {
                    "content": faker.commerce.productDescription(),
                    "status": randomIntFromInterval(1, 3),
                    "author": faker.internet.userName(),
                    "email": faker.internet.email(),
                    "url": faker.internet.url(),
                    "post_id": post._id
                }
                await commentsCollection.insertOne(comment);
            }
        }
        console.log("Database seeded");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}
seedDB();