import auth0 from 'auth0-js'
import history from 'utils/History'

class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-haqim.us.auth0.com",
    clientID: 'lGUX21LrXudN3Kz9gPM4N8m71S2LyG4K',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });
  userProfile = {}
  
  login = () => {
      this.auth0.authorize();
  }

  handleAuth = () => {
      this.auth0.parseHash((err, authResult) => {
          if(authResult){
            //   console.log(authResult)
              localStorage.setItem('access_token', authResult.accessToken)
              localStorage.setItem('id_token', authResult.idToken)
            
              let expiresIn = JSON.stringify(authResult.expiresIn * 100 + new Date().getTime())

              localStorage.setItem("expires_in", expiresIn);
              this.getProfile()
              setTimeout(() => {
                  history.replace('/authcheck')
              }, 2000);
          }else{
              console.log(err)
          }
      })
  }

  getAccessToken = () => {
      if(localStorage.getItem('access_token')){
          return localStorage.getItem('access_token')
      }else{
          return null
      }
  }

  getProfile = () => {
      let accessToken = this.getAccessToken()
      if (accessToken){
          this.auth0.client.userInfo(accessToken, (err, profile) => {
              if(profile){
                  this.userProfile = {
                      profile
                  }
              }
          })
      }
  }

  logout = () =>{
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem('expires_in');
      setTimeout(() => {
          history.replace('/authcheck')
      }, 300);
  }

  isAuthenticated = () => {
      let expiresIn = JSON.parse(localStorage.getItem('expires_in'))
      this.getProfile()
      return new Date().getTime() < expiresIn
  }
}

export default Auth;