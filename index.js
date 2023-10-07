// import library expressjs
const express = require('express');
const bodyParser = ('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// create logger middleware function
function LoggerMiddleware(req, res, next) {
    console.log(`Request received at: ${new Date()}`)
    next(); // continue process next function
}

app.use(LoggerMiddleware);

// create handling http GET ALL Customer
app.get('/api/customers', (req, res) => {
    const { keyword, category, limit } = req.query; // request query string by keyword, category, limit

    res.status(200).json({
        message: 'get success data',
        data: [
            {
                name: 'Hawra Fathiya Zahra',
                email: 'hawra.fzahra@gmail.com',
                role: 'Frontend'
            },
            {
                name: 'Fathiya Zahra',
                email: 'fathiyaz@gmail.com',
                role: 'Backend'
            }
        ],
        pagination: {
            total_record: 100,
            current_page: 1,
            total_pages: limit,
        },
        search: {
            keyword: keyword,
            category: category
        }
    })
})

// create handling http POST ADD Customer
app.post('/api/customers', LoggerMiddleware, (req, res) => {
    const { name, email, role } = req.body;

    res.status(201).json({
        message: "create data customer successfully",
        data: {
            name: name,
            email: email,
            role: role
        }
    })
})

// create handling http GET DETAIL Customer
app.get('/api/customer/id:', (req, res) => {
    const customerID = req.params.id; // request params by id customer
    res.status(200).json({
        message: 'get success',
        data: {
            customerID: customerID,
            name: 'Hawra Fathiya Zahra',
            email: 'hawra.fzahra@gmail.com',
            role: 'Frontend'
        }
    })
})

// define listener port using 3000
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
    console.log(`App is listening on port ${port}`);
})