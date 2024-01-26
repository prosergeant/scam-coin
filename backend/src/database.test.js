const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create person', async () => {
    expect.assertions(1);
    const person = await db.Person.create({
        // id: 1,
        username: 'test',
        userid: '123456'
    });
    expect(person.username).toEqual('test');
});

test('get person', async () => {
    expect.assertions(2);
    const person = await db.Person.findOne({
        where: {
            username: 'test',
            userid: '123456'
        }
    });
    expect(person.username).toEqual('test');
    expect(person.userid).toEqual('123456');
});

test('patch person', async () => {
    expect.assertions(1);
    const person = await db.Person.findOne({
        where: {
            username: 'test',
            userid: '123456'
        }
    });

    person.update({username: 'test2'})
    expect(person.username).toEqual('test2');
});

test('delete person', async () => {
    expect.assertions(1);
    await db.Person.destroy({
        where: {
            username: 'test2',
            userid: '123456'
        }
    });
    const person = await db.Person.findOne({
        where: {
            username: 'test2',
            userid: '123456'
        }
    });
    expect(person).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
