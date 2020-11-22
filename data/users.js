import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password:  bcrypt.hashSync("123456", 10),
    },
    {
        name: 'John DOe',
        email: 'john@example.com',
        password:  bcrypt.hashSync("123456", 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password:  bcrypt.hashSync("123456", 10)
    
    },
    {
        name: 'Dejavu xtrem',
        email: 'dejavu@example.com',
        password:  bcrypt.hashSync("dejay", 10),
        isAdmin: true
    },
            
]

export default users