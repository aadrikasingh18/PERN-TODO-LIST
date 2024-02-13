const express = require("express");
const cors = require("cors");
const { poolcb } = require("./dbConfig.js");

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());


// ROUTES

app.get('/', async (req, res) => {
    try {
        res.send("HOME PAGE");
    }
    catch (err) {
        console.log(err.message);
    }
})

// CREATE A TODO

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await poolcb.query("INSERT INTO todoDetails (description) VALUES($1) RETURNING *", [description]
        );
        res.json(newTodo.rows[0]);
        console.log(req.body);
    }
    catch (err) {
        console.log(err.message);
    }
}
);

// GET ALL TODO

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await poolcb.query("SELECT * FROM todoDetails");
        res.json(allTodos.rows);
        // console.log(req.body);
    }
    catch (err) {
        console.log(err.message);
    }
}
);


// GET SINGLE TODO
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await poolcb.query("SELECT * FROM todoDetails WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
}
);

// UPDATE A TODO

app.put('/todos/:id', async (req, res) => {
    try {
        //Need to have 2 things 
        // 1. req.body to get information about the description that we are trying to add to the database
        // 2. req.params to specify what type of todo we want
        // So we are going to need both of them to update

        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await poolcb.query("UPDATE todoDetails SET description = $1 WHERE todo_id = $2", [description, id]
        );
        // $1 is variable eiske jaga $100 bhi kr skte
        res.json("Todo was Updated");
    }
    catch (err) {
        console.log(err.message);
    }
}
);

// DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await poolcb.query("DELETE FROM todoDetails WHERE todo_id = $1", [id]);
        res.json("Todo was Deleted")
    }
    catch (err) {
        console.log(err.message);
    }
});


// Server start krne ke liye 
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));