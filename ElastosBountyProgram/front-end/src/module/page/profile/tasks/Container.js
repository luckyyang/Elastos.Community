import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import _ from 'lodash'

import {USER_ROLE, TASK_TYPE, TASK_CANDIDATE_STATUS, TASK_CATEGORY, TASK_STATUS} from '@/constant'

export default createContainer(Component, (state) => {
    const currentUserId = state.user.current_user_id
    const isAdmin = state.user.role === USER_ROLE.ADMIN
    const taskState = {
        ...state.task,
        currentUserId,
        is_leader: state.user.role === USER_ROLE.LEADER,
        is_admin: isAdmin
    }

    return taskState
}, () => {

    const taskService = new TaskService()

    return {

        /**
         * We are querying tasks:
         *
         * 1. owner of
         * 2. we are a candidate of
         * 3. assigned to (this is a candidate with STATUS approved) including in 2
         *
         * @returns {Promise<*>}
         */

        async getTasks(query) {
            return taskService.index({
                type: [TASK_TYPE.TASK, TASK_TYPE.EVENT],
                category: [TASK_CATEGORY.DEVELOPER, TASK_CATEGORY.SOCIAL],
                ...query,
            })
        },

        async loadMoreTasks(query) {
            return taskService.loadMore({
                type: [TASK_TYPE.TASK, TASK_TYPE.EVENT],
                category: [TASK_CATEGORY.DEVELOPER, TASK_CATEGORY.SOCIAL],
                ...query,
            })
        },

        resetTasks () {
            return taskService.resetAllTasks()
        },

        async setFilter(options) {

        },

        async getUserTeams(currentUserId) {

            const teamService = new TeamService()

            return teamService.getUserTeams(currentUserId)
        }
    }
})
