import {createContainer, goPath} from "@/util";
import Component from './Component';
import UserService from '@/service/UserService';
import {message} from 'antd'
import _ from 'lodash'

message.config({
    top: 100
})


export default createContainer(Component, (state)=>{
    return {
        is_admin: state.user.is_admin
    };
}, ()=>{
    const userService = new UserService();

    return {
        async getCurrentUser() {

            try {
                const rs = await userService.getCurrentUser()
            } catch (err) {
                message.error(err.message)
            }
        },

        async updateUser(formData, state) {
            // TODO: refactor this, if it's current user it's current_user_id and otherwise it's _id
            // should always be _id
            const userId = this.user.current_user_id || this.user._id
            const doc = {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                profile: {
                    // General
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    gender: formData.gender,
                    country: formData.country,
                    timezone: formData.timezone,
                    avatar: state.avatar_url,
                    walletAddress: formData.walletAddress,

                    // Social Media
                    telegram: formData.telegram,
                    reddit: formData.reddit,
                    wechat: formData.wechat,
                    twitter: formData.twitter,
                    facebook: formData.facebook,
                    linkedin: formData.linkedin,
                    github: formData.github,

                    // Questions
                    beOrganizer: formData.beOrganizer === 'yes',
                    isDeveloper: formData.isDeveloper === 'yes',
                },
            }

            if(this.is_admin){
                doc.role = formData.role
            }

            try {
                const rs = await userService.update(userId, doc);

                if (rs) {
                    message.success('User updated successfully');

                    // state.editing = false
                    // this.setState({editing: false})
                }
            } catch (err) {
                // message.error('There was an error creating this task')
                message.error(err.message) // TODO: add rollbar?
            }
        },

        async checkEmail(email) {
            try {
                await userService.checkEmail(email)
                return false
            } catch (err) {
                return true
            }
        }
    };
});
