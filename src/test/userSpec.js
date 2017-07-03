'use strict';
const user =  require('../public/user'), nullemail = 'null.email@gmail.com';

describe('userSpec.create::', ()=> {
    const email = 'myemail@gmail.com';
    var newuser;

    it('create', ()=> {
        newuser = user.create(email, 'forename', 'surname');
        expect(newuser).toBeDefined();
        expect(newuser.id).toBeDefined();
    });

    it('read_by_email', ()=> {
        let foundByEmail = user.findByEmail(email);
        expect(newuser.id).toEqual(foundByEmail.id);
        expect(newuser.created.getMilliseconds()).toEqual(foundByEmail.created.getMilliseconds());
    });

    it('read_by_id', ()=> {
        let foundById = user.findById(newuser.id);
        expect(newuser.id).toEqual(foundById.id);
        expect(newuser.created.getMilliseconds()).toEqual(foundById.created.getMilliseconds());
    });

    it('read_all', ()=> {
        let allUsers = user.all();
        expect(allUsers.length).toEqual(1);
    });

    it('read_null', ()=> {
        let nullreadEmail = user.findByEmail(nullemail);
        expect(nullreadEmail).toBe(null);

        let nullreadId = user.findById('nullid');
        expect(nullreadId).toBe(null);
    });

    it('create_dup_email', ()=> {
        let duplicateUser = () => {user.create(email, 'forename', 'surname')};
        expect(duplicateUser).toThrowError('Duplicate key for property email: myemail@gmail.com');
    });

    it('create_null_user', ()=> {
        let emptyUser = () => {user.create(null, 'forename', 'surname')};
        expect(emptyUser).toThrowError('Create user failed: Missing values ,forename,surname');
    });

});

describe('UserSpec.update::', ()=> {
    
    const updateEmail = 'updateemail@gmail.com';

    it('update', ()=> {
        let newuser = user.create(updateEmail, 'Blah', 'second');
        let updatedUser = user.update({id: newuser.id, email: updateEmail, forename: 'first'});
        expect(updatedUser).toBeDefined();
        expect(updatedUser.forename).toEqual('first');
    });


    it('update_null', ()=> {
        let updateNulluser = () => {user.update({id: 'null', email: nullemail, forename: 'first'})};
        expect(updateNulluser).toThrowError('Update failed no user null.email@gmail.com');
    });

});

describe('UserSpec.delete::', ()=> {
    const emaildelete = 'deleteemail@gmail.com';

    it('remove', ()=> {
        user.create(emaildelete, 'Blah', 'second');
        user.deleteByEmail(emaildelete);
        expect(user.findByEmail(emaildelete)).toBe(null);
    });

    it('remove_null', ()=> {
        let deleteUser = () => {user.deleteByEmail(nullemail)};
        expect(deleteUser).toThrowError('Delete failed no user null.email@gmail.com');
    });

});
