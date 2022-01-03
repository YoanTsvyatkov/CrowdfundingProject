const { User } = require("../model/User")

class UserService {
    async createUser(firstName, lastName, age, occupation, email, phoneNumber, profileDescription,
        password) {
        const user = User.build({
            firstName: firstName,
            lastName: lastName,
            age: age,
            occupation: occupation,
            email: email,
            phoneNumber: phoneNumber,
            profileDescription: profileDescription,
            password: password
        });
        await user.validate();
        await user.save();

        return JSON.parse(JSON.stringify(user))
    }

    async getUserByEmail(email) {
        const investorInst = await User.findOne({ where: { email: email } });
        const investor = JSON.parse(JSON.stringify(investorInst));
        return investor;
    }

    async updateUser(user) {
        const oldUser = await User.findOne({ where: { profileID: user.profileID } });
        oldUser.update({
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            occupation: user.occupation,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profileDescription: user.profileDescription
        })
    }

    async deleteUserByID(ID) {
        const toDelete = await User.findOne({ where: { profileID: ID } });
        await toDelete.destroy();
    }
}

exports.UserService = UserService