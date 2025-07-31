import { useAuth } from './auth'
const { getRefreshToken } = useAuth()

export function useStoreApi() {
  function loginByUserAccount(
    _userId: string,
    _userPwd: string,
    _connIp: string,
    _userOtpPass?: string
  ) {
    const data = {
      loginId: _userId,
      loginPwd: _userPwd,
      userOtpPass: _userOtpPass,
      deviceType: 'P',
      connIp: _connIp
    }
    console.log('api data', data)
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

  function updateTokenByRefreshToken() {
    return $http({
      url: selectConfig.auth.login.refresh.url,
      method: 'get',
      headers: {
        refreshToken: getRefreshToken()
      }
    })
  }

  function validToken() {
    return $http({
      url: selectConfig.auth.login.valid.url,
      method: 'get'
    })
  }

  function getLangInfo(_lang: string, _divide?: string) {
    const data = {
      lang: _lang,
      divide: _divide
    }
    return $http({
      url: selectConfig.system.lang.url,
      method: 'post',
      data
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
    updateTokenByRefreshToken,
    validToken,
    getLangInfo,
    getFavorites
  }
}
