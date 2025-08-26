export function useStoreApi() {
  function loginByUserAccount(
    email: string,
    password: string,
  ) {
    const data = {
      email: email,
      password: password,
    }
    return $http({
      url: transactionConfig.auth.login.insert.url,
      method: 'post',
      data
    })
  }

  function logout() {
    return $http({
      url: transactionConfig.auth.login.logout.url,
      method: 'post'
    })
  }

  function getFavorites(userId: string) {
    const url = selectConfig.sys.favorite.list.url
    return $http({
      url: url,
      method: 'get',
      params: {
        lang: getLang(),
        userId: userId
      }
    })
  }

  return {
    loginByUserAccount,
    logout,
    getFavorites
  }
}
