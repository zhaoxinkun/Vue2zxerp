// 关于token的存储

const tokenKey = "token";

// 设置存储
export const setToken = token => sessionStorage.setItem(tokenKey, token)

// 设置获取
export const getToken = () => sessionStorage.getItem(tokenKey)

// 设置删除
export const removeToken = () => sessionStorage.removeItem(tokenKey)
