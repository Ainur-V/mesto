export default class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }

    setUserInfo(name, info, id) {
        this._name.textContent = name;
        this._info.textContent = info;
        this._id = id;
    }

    getUserId() {
        return this._id;
    }

    setAvatar(url) {
        this._avatar.src = url;
    }
}