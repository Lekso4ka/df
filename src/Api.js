class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.token = token;
    }
    setBody(obj) {
        return JSON.stringify(obj);
    }
    setHeaders(isContentType = false, isToken = true) {
        const obj = {}
        if (isContentType) {
            obj["Content-Type"] = "application/json"
        }
        if (isToken) {
            obj["Authorization"] = `Bearer ${this.token}`
        }
        return obj;
    }
    checkRes(res) {
        if (res.ok) {
            return res.json()
        } else {
            res.json()
                .then(err => {
                    alert(err.message)
                })
        }
    }
    login(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: this.setHeaders(true, false),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
    signup(body) {
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: this.setHeaders(true, false),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
    forgotPwd(body) {
        return fetch(`${this.path}/forgot-password`, {
            method: "POST",
            headers: this.setHeaders(true, false),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
    resetPwd(body) {
        return fetch(`${this.path}/password-reset/${body.token}`, {
            method: "PATCH",
            headers: this.setHeaders(true, false),
            body: this.setBody({password: body.password})
        })
            .then(res => this.checkRes(res))
    }
    getProducts() {
        return fetch(`${this.path}/products?page=1&limit=1000`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    searchProducts(query) {
        return fetch(`${this.path}/products/search?query=${query}`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    getProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
    updProduct(id, body) {
        return fetch(`${this.path}/products/${id}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
    delProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: "DELETE",
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    setLike(id, isLike) {
        return fetch(`${this.path}/products/likes/${id}`, {
            method: isLike ? "PUT" : "DELETE",
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    getAllReviews() {
        return fetch(`${this.path}/products/review`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    getReviews(id) {
        return fetch(`${this.path}/products/review/${id}`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    addReview(id, body) {
        return fetch(`${this.path}/products/review/${id}`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
    delReview(id, reviewId) {
        return fetch(`${this.path}/products/review/${id}/${reviewId}`, {
            method: "DELETE",
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    getAllUsers() {
        return fetch(`${this.path}/users`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    getUser(id) {
        return fetch(`${this.path}/users/${id}`, {
            headers: this.setHeaders()
        })
            .then(res => this.checkRes(res))
    }
    updProfile(body, isAvatar = false) {
        return fetch(`${this.path}/users/me${isAvatar ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: this.setBody(body)
        })
            .then(res => this.checkRes(res))
    }
}

export default Api;