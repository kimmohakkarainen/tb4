export {
  postLogin,
  postLogout,
  fetchState,
  fetchStateSucceeded,
  postCreate,
  postDelete,
  postAssign,
  postUnassign,
  postFinish,
  postPassword
} from "./server";

export { 
	getUsers, 
	modifyUser,
	getExaminations, 
	modifyExamination } from "./admincalls";

export { getPreview, getExcel, fetchPreviewSucceeded } from "./invoice";

export function openCreateTaskModal() {
	return {
	    type: "OPEN_CREATE_TASK_MODAL",
	    payload: {
	      createTaskModal: true
	    }
	};
}

export function openModifyTaskModal(task) {
	return {
	    type: "OPEN_MODIFY_TASK_MODAL",
	    payload: {
	      modifyTaskModal: task
	    }
	};
}

export function openModifyInfoModal(task) {
	return {
	    type: "OPEN_MODIFY_INFO_MODAL",
	    payload: {
	      modifyInfoModal: task
	    }
	};
}

export function openModifyMessageModal(task) {
	return {
	    type: "OPEN_MODIFY_MESSAGE_MODAL",
	    payload: {
	      modifyMessageModal: task
	    }
	};
}


export function openDeleteTaskModal(task) {
	return {
	    type: "OPEN_DELETE_TASK_MODAL",
	    payload: {
	      deleteTaskModal: task
	    }
	};
}


export function openUnassignTaskModal(task) {
	return {
	    type: "OPEN_UNASSIGN_TASK_MODAL",
	    payload: {
	      unassignTaskModal: task
	    }
	};
}


export function openFinishTaskModal(task) {
	return {
	    type: "OPEN_FINISH_TASK_MODAL",
	    payload: {
	      finishTaskModal: task
	    }
	};
}

export function openUnfinishTaskModal(task) {
	return {
	    type: "OPEN_UNFINISH_TASK_MODAL",
	    payload: {
	      unFinishTaskModal: task
	    }
	};
}


