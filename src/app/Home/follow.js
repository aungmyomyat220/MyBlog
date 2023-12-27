import {updateUser} from "../../../api/api";

export default function Follow (followers,userId) {
    alert("success")
    updateUser(followers,userId)
}